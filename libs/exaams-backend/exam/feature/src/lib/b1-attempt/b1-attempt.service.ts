import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  B1AnswersForm,
  B1ExamWithTasks,
  executePromise,
  PrismaService,
} from '@com.language.exams/exaams-backend/utils';
import { B1ExaamService } from '../b1-exam/b1-exaam.service';

@Injectable()
export class B1AttemptService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => B1ExaamService))
    private readonly b1ExaamService: B1ExaamService
  ) {}

  async createOrUpdateExamAttempt(
    userEmail: string,
    examId: string,
    answers: B1AnswersForm
  ) {
    const [latestExamAttempt, examAttemptError] = await executePromise(
      this.getLatestExamAttemptByExamIdAndUserEmail(examId, userEmail)
    );

    if (examAttemptError) {
      console.warn('Error while getting latest exam attempt', examAttemptError);
      throw new NotFoundException('Failed to get latest exam attempt');
    }
    let [result, error] = [null, null];
    if (latestExamAttempt && !latestExamAttempt?.isCompleted) {
      [result, error] = await executePromise(
        this.updateExamAttempt(userEmail, examId, answers)
      );
    } else {
      [result, error] = await executePromise(
        this.createExamAttempt(userEmail, examId, answers)
      );
    }
    if (error) {
      console.warn('Error while creating/updating exam attempt', error);
      throw new NotFoundException('Failed to create/update exam attempt', {
        cause: error,
      });
    }

    return result;
  }

  async createExamAttempt(
    userEmail: string,
    examId: string,
    answers: B1AnswersForm
  ) {
    console.log('createExamAttempt');
    const exam = await this.b1ExaamService.getExaamByNameOrId(examId);

    const { answersData, score, progress } = this.calculateAnswersData(
      exam,
      answers
    );

    return this.prismaService.b1ExamAttempt.create({
      data: {
        user: { connect: { email: userEmail } },
        exam: { connect: { id: examId } },
        answers: { create: answersData },
        progress,
        score,
        isCompleted: progress === 100,
      },
    });
  }

  async updateExamAttempt(
    userEmail: string,
    examId: string,
    answers: B1AnswersForm
  ) {
    console.log('updateExamAttempt');
    const exam = await this.b1ExaamService.getExaamByNameOrId(examId);

    const latestExamAttempt =
      await this.getLatestExamAttemptByExamIdAndUserEmail(examId, userEmail);

    if (!latestExamAttempt) {
      console.warn('No exam Attempt found');
      throw new NotFoundException(
        'Failed to update Exam, No exam Attempt found'
      );
    }

    const { answersData, score, progress } = this.calculateAnswersData(
      exam,
      answers
    );

    latestExamAttempt.answers.forEach((answer) => {
      const newAnswerData = answersData.find(
        (foundAnswer) =>
          foundAnswer.taskName === answer.taskName &&
          foundAnswer.itemNumber === answer.itemNumber
      );
      this.prismaService.answer.update({
        where: {
          id: answer.id,
        },
        data: {
          chosenAnswer: newAnswerData?.chosenAnswer,
          isCorrect: newAnswerData?.isCorrect,
        },
      });
    });

    return this.prismaService.b1ExamAttempt.update({
      where: { attemptId: latestExamAttempt.attemptId },
      data: {
        progress,
        score,
        isCompleted: progress === 100,
      },
    });
  }

  async getExamAttempts() {
    return this.prismaService.b1ExamAttempt.findMany({
      include: {
        user: true,
        exam: true,
        answers: true,
      },
    });
  }

  async getLatestExamAttemptByExamIdAndUserEmail(
    examId: string,
    userEmail: string
  ) {
    return this.prismaService.b1ExamAttempt
      .findMany({
        where: {
          examId: examId,
          user: { email: userEmail },
        },
        orderBy: { createdAt: 'desc' },
        take: 1,
        include: {
          answers: true,
          exam: true,
        },
      })
      .then((attempts: any[]) => attempts[0]);
  }

  async getExaamAttemptsByUserEmail(userEmail: string) {
    return this.prismaService.b1ExamAttempt.findMany({
      where: { user: { email: userEmail } },
      include: { answers: true },
    });
  }

  private calculateAnswersData(exam: B1ExamWithTasks, answers: B1AnswersForm) {
    let score = 0;
    let nbrOfChosenAnswers = 0;
    let totalNumberOfQuestions = 0;

    const answersData = Object.entries(answers)
      .filter(([taskName]) => {
        return taskName !== 'examId';
      })
      .flatMap(([taskName, taskAnswers]) =>
        Object.entries(taskAnswers).map(([itemNumber, chosenAnswer]) => {
          const itemNumberInt = parseInt(itemNumber);
          console.log('itemNumberInt', itemNumberInt);
          const correctAnswer = exam[taskName]?.questions.find(
            (qst) => qst.questionNumber === itemNumberInt
          )?.correctAnswer;

          const isCorrect = correctAnswer === chosenAnswer;
          if (isCorrect) ++score;
          if (chosenAnswer) ++nbrOfChosenAnswers;
          ++totalNumberOfQuestions;
          return {
            taskName,
            itemNumber,
            chosenAnswer,
            isCorrect,
          };
        })
      );

    console.log('nbrOfChosenAnswers', nbrOfChosenAnswers);
    console.log('totalNumberOfQuestions', totalNumberOfQuestions);
    const progress =
      totalNumberOfQuestions > 0
        ? (nbrOfChosenAnswers / totalNumberOfQuestions) * 100
        : 0;

    return { answersData, score, progress };
  }
}
