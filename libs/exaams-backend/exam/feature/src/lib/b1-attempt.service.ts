import { Injectable } from '@nestjs/common';
import {
  B1AnswersForm,
  B1ExamWithTasks,
  PrismaService,
} from '@com.language.exams/exaams-backend/utils';
import { B1ExaamService } from './b1-exaam.service';
import { B1Exam } from '@prisma/client';

@Injectable()
export class B1AttemptService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly b1ExaamService: B1ExaamService
  ) {}

  async createOrUpdateExamAttempt(
    userEmail: string,
    examId: string,
    answers: B1AnswersForm,
    attemptId?: string
  ) {
    const answersData = Object.entries(answers).flatMap(
      ([taskName, taskAnswers]) =>
        Object.entries(taskAnswers).map(([itemNumber, chosenAnswer]) => ({
          taskName,
          itemNumber,
          chosenAnswer,
          isCorrect: null,
        }))
    );

    return this.prismaService.b1ExamAttempt.upsert({
      where: {
        examId: examId,
        attemptId: attemptId,
        user: {
          email: userEmail,
        },
      },
      create: {
        user: {
          connect: {
            email: userEmail,
          },
        },
        exam: {
          connect: {
            id: examId,
          },
        },
        answers: {
          create: answersData,
        },
        score: null,
      },
      update: {
        answers: {
          deleteMany: {},
          create: answersData,
        },
        score: null,
      },
    });
  }

  async createExamAttempt(
    userEmail: string,
    examId: string,
    answers: B1AnswersForm
  ) {
    const exam: B1ExamWithTasks = await this.b1ExaamService.getExaamByNameOrId(
      examId
    );

    const answersData = Object.entries(answers).flatMap(
      ([taskName, taskAnswers]) =>
        Object.entries(taskAnswers).map(([itemNumber, chosenAnswer]) => {
          const correctAnswer = exam[taskName]?.questions.find(
            (qst) => qst.questionNumber === parseInt(itemNumber)
          )?.correctAnswer;

          return {
            taskName,
            itemNumber,
            chosenAnswer,
            isCorrect: correctAnswer === chosenAnswer,
          };
        })
    );

    return this.prismaService.b1ExamAttempt.create({
      data: {
        user: {
          connect: {
            email: userEmail,
          },
        },
        exam: {
          connect: {
            id: examId,
          },
        },
        answers: {
          create: answersData,
        },
        score: null,
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

  async getExaamAttemptsByUserEmail(userEmail: string) {
    return this.prismaService.b1ExamAttempt.findMany({
      where: {
        user: {
          email: userEmail,
        },
      },
      include: {
        answers: true,
      },
    });
  }
}
