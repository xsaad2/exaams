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
import { Answer } from '@prisma/client';

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

    if (Array.isArray(latestExamAttempt.answers)) {
      await Promise.all(
        latestExamAttempt.answers.map((answer) => {
          const newAnswerData = answersData.find(
            (foundAnswer) =>
              foundAnswer.taskName === answer.taskName &&
              foundAnswer.itemNumber === answer.itemNumber
          );
          return this.prismaService.answer.update({
            where: {
              id: answer.id,
            },
            data: {
              chosenAnswer: newAnswerData?.chosenAnswer,
              isCorrect: newAnswerData?.isCorrect,
            },
          });
        })
      );
    } else {
      console.warn('No answers found for the latest exam attempt');
    }

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
      .then((attempts) => attempts[0]);
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
    let answersData: Pick<
      Answer,
      'itemNumber' | 'isCorrect' | 'taskName' | 'chosenAnswer'
    >[] = [];
    try {
      answersData = Object.entries(answers)
        .filter(([taskName]) => {
          return taskName !== 'examId';
        })
        .flatMap(([taskName, taskAnswers]) =>
          Object.entries(taskAnswers).map(([itemNumber, chosenAnswer]) => {
            const itemNumberInt = itemNumber;
            const correctAnswer = exam[taskName]?.questions.find((qst) => {
              console.log('qst.questionNumber', qst.questionNumber);
              console.log('itemNumberInt new', itemNumberInt.slice(1));
              return String(qst.questionNumber) === itemNumberInt.slice(1);
            })?.correctAnswer;

            const isCorrect = correctAnswer === chosenAnswer;
            if (isCorrect) ++score;
            if (chosenAnswer) ++nbrOfChosenAnswers;
            ++totalNumberOfQuestions;
            return {
              taskName,
              itemNumber: itemNumberInt,
              chosenAnswer: chosenAnswer,
              isCorrect,
            };
          })
        );
    } catch (e) {
      console.error('Error while calculating answers data', e);
      throw new NotFoundException('Failed to calculate answers data', {
        cause: e,
      });
    }

    const progress =
      totalNumberOfQuestions > 0
        ? Math.round((nbrOfChosenAnswers / totalNumberOfQuestions) * 100)
        : 0;

    return { answersData, score, progress };
  }
}
