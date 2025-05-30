import {
  B1AnswersForm,
  executePromise,
  PrismaService,
  ReadingTaskFiles,
} from '@com.language.exams/exaams-backend/utils';
import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Client } from 'minio';

import { Express } from 'express';
import { B1ExamAttempt } from '@prisma/client';
import { ExamCatalogItem } from '@com.language.exams/exaams-backend/utils';
import { B1AttemptService } from '../b1-attempt/b1-attempt.service';
// This is a hack to make Multer available in the Express namespace

type File = Express.Multer.File;

@Injectable()
export class B1ExaamService {
  private minioClient = new Client({
    endPoint: process.env['MINIO_ENDPOINT'] || 'localhost',
    port: process.env['MINIO_PORT']
      ? parseInt(process.env['MINIO_PORT'])
      : 9000,
    useSSL: false,
    accessKey: process.env['MINIO_ACCESS_KEY'],
    secretKey: process.env['MINIO_SECRET_KEY'],
  });

  constructor(
    private prismaService: PrismaService,
    @Inject(forwardRef(() => B1AttemptService))
    private readonly b1AttemptService: B1AttemptService
  ) {}

  async createB1Exaam(exaam: any, files: ReadingTaskFiles) {
    try {
      const {
        name,
        createdAt,
        deletedAt,
        readingTask1,
        readingTask2a,
        readingTask2b,
        readingTask3,
        readingTask4,
        readingTask5,
        hearingTask1,
        hearingTask2,
        hearingTask3,
        hearingTask4,
      } = exaam;

      // Upload audio file

      if (!files || !files.audioTrack || !files.audioTrack[0]) {
        throw new InternalServerErrorException('Audio track file is missing');
      }
      await this.minioClient.putObject(
        process.env.MINIO_AUDIO_BUCKET,
        `${name}-audioTrack`,
        files.audioTrack[0].buffer
      );

      return this.prismaService.b1Exam.create({
        data: {
          name,
          createdAt: new Date(createdAt),
          creator: {
            connectOrCreate: {
              where: {
                email: 'saad.belkhou@gmail.com',
              },
              create: {
                createdAt: new Date(createdAt),
                name: 'saad',
                email: 'saad.belkhou@gmail.com',
              },
            },
          },
          deletedAt: deletedAt ? new Date(deletedAt) : null,
          readingTask1: this.createReadingTask(
            readingTask1,
            files.readingTask1Image
          ),
          readingTask2a: this.createReadingTask(
            readingTask2a,
            files.readingTask2aImage
          ),
          readingTask2b: this.createReadingTask(
            readingTask2b,
            files.readingTask2bImage
          ),
          readingTask3: this.createReadingTask(
            readingTask3,
            files.readingTask3Image
          ),
          readingTask4: this.createReadingTask(
            readingTask4,
            files.readingTask4Image
          ),
          readingTask5: this.createReadingTask(
            readingTask5,
            files.readingTask5Image
          ),
          hearingTask1: this.createHearingTask(hearingTask1),
          hearingTask2: this.createHearingTask(hearingTask2),
          hearingTask3: this.createHearingTask(hearingTask3),
          hearingTask4: this.createHearingTask(hearingTask4),
        },
      });
    } catch (e) {
      console.error('Error while creating Exam', e);
      throw new InternalServerErrorException('Error while creating Exam', {
        cause: e,
      });
    }
  }

  createReadingTask(readingTask: any, file: File | null | undefined) {
    return {
      create: {
        taskNumber: readingTask.taskNumber,
        instructions: readingTask.instructions,
        textTitle: readingTask.textTitle,
        textContents: readingTask.textContents,
        workTimeInMinutes: readingTask.workTimeInMinutes,
        questions: {
          create: readingTask.questions.map((q: any) => ({
            questionNumber: q.questionNumber,
            statement: q.statement,
            options: q.options,
            correctAnswer: q.correctAnswer,
            questionText: q.questionText,
          })),
        },
        posters: readingTask.posters
          ? {
              create: readingTask.posters.map((p: any) => ({
                letter: p.letter,
                title: p.title,
                hook: p.hook ?? '',
                body: p.body ?? '',
                offeredServices: p.offeredServices ?? [],
                siteUrl: p.siteUrl ?? '',
                contact: p.contact ?? '',
              })),
            }
          : undefined,
        imagesContents: file
          ? {
              create: {
                name: file[0].originalname,
                imageData: file[0].buffer,
              },
            }
          : undefined,
      },
    };
  }

  createHearingTask(hearingTask: any) {
    return {
      create: {
        taskNumber: hearingTask?.taskNumber,
        instructions: hearingTask.instructions,
        audioContext: hearingTask?.audioContext,
        questions: {
          create: hearingTask.questions.map((q: any) => ({
            questionNumber: q.questionNumber,
            statement: q.statement,
            options: q.options,
            correctAnswer: q.correctAnswer,
          })),
        },
      },
    };
  }

  async getAllExaams() {
    const res = await this.prismaService.b1Exam.findMany({
      include: {
        creator: true,
        readingTask1: {
          include: {
            questions: true,
          },
        },
        readingTask2a: {
          include: {
            questions: true,
          },
        },
        readingTask2b: {
          include: {
            questions: true,
          },
        },
        readingTask3: {
          include: {
            questions: true,
            imagesContents: true,
            posters: true,
          },
        },
        readingTask4: {
          include: {
            questions: true,
          },
        },
        readingTask5: {
          include: {
            questions: true,
          },
        },
        hearingTask1: {
          include: {
            questions: true,
          },
        },
        hearingTask2: {
          include: {
            questions: true,
          },
        },
        hearingTask3: {
          include: {
            questions: true,
          },
        },
        hearingTask4: {
          include: {
            questions: true,
          },
        },
      },
    });
    return await Promise.all(
      res.map(async (e) => {
        e.audioTrackUrl = await this.minioClient.presignedUrl(
          'GET',
          process.env['MINIO_AUDIO_BUCKET'] || '',
          `${e.name}-audioTrack`
        );
        return e;
      })
    );
  }

  async getExaamByNameOrId(nameOrId: string) {
    if (!nameOrId) {
      throw new InternalServerErrorException('Name or ID is missing');
    }
    try {
      const exam = await this.prismaService.b1Exam.findFirst({
        where: {
          OR: [
            {
              id: nameOrId,
            },
            {
              name: nameOrId,
            },
          ],
        },
        include: {
          creator: true,
          readingTask1: {
            include: {
              questions: true,
            },
          },
          readingTask2a: {
            include: {
              questions: true,
            },
          },
          readingTask2b: {
            include: {
              questions: true,
            },
          },
          readingTask3: {
            include: {
              questions: true,
              posters: true,
            },
          },
          readingTask4: {
            include: {
              questions: true,
            },
          },
          readingTask5: {
            include: {
              questions: true,
            },
          },
          hearingTask1: {
            include: {
              questions: true,
            },
          },
          hearingTask2: {
            include: {
              questions: true,
            },
          },
          hearingTask3: {
            include: {
              questions: true,
            },
          },
          hearingTask4: {
            include: {
              questions: true,
            },
          },
        },
      });

      const presignedUrl = await this.minioClient.presignedUrl(
        'GET',
        process.env['MINIO_AUDIO_BUCKET'] || '',
        `${exam?.name}-audioTrack`
      );
      return {
        ...exam,
        audioTrackUrl: presignedUrl,
      };
    } catch (e) {
      console.error('Error while getting Exam', e);
      throw new InternalServerErrorException('Error while getting Exam', {
        cause: e,
      });
    }
  }

  async getExamsCatalog(email: string) {
    const [exams, examsError] = await executePromise(
      this.prismaService.b1Exam.findMany()
    );

    if (examsError || !exams) {
      console.warn('Error while getting Exams Catalog', examsError);
      throw new InternalServerErrorException(
        'Error while getting Exams Catalog',
        {
          cause: examsError,
        }
      );
    }

    const result: ExamCatalogItem[] = [];

    for (const exam of exams) {
      const [lastExamAttempt, attemptError] = await executePromise(
        this.prismaService.b1ExamAttempt.findMany({
          where: {
            user: {
              email: email,
            },
            examId: exam.id,
          },
          orderBy: {
            updatedAt: 'desc',
          },
          take: 1,
          include: {
            answers: true,
          },
        })
      );

      if (attemptError) {
        console.warn('Error while getting Latest Exam Attempt', attemptError);
        throw new InternalServerErrorException(
          'Error while getting Latest Exam Attempt',
          {
            cause: attemptError,
          }
        );
      }

      const answersForm: B1AnswersForm = {
        examId: exam.id,
        readingTask1: {},
        readingTask2a: {},
        readingTask2b: {},
        readingTask3: {},
        readingTask4: {},
        hearingTask1: {},
        hearingTask2: {},
        hearingTask3: {},
        hearingTask4: {},
      };

      lastExamAttempt[0]?.answers.forEach((answer) => {
        if (!answersForm[answer.taskName]) {
          answersForm[answer.taskName] = {};
        }
        answersForm[answer.taskName][answer.itemNumber] = answer.chosenAnswer;
      });

      const catalogItem: ExamCatalogItem = {
        id: exam.id,
        name: exam.name,
        attemptsCount: lastExamAttempt.length,
        level: 'B1',
        lastScore: lastExamAttempt[0]?.score,
        lastAttemptDate: lastExamAttempt[0]?.updatedAt,
        progress: lastExamAttempt[0]?.progress,
        openAttempt: lastExamAttempt[0]?.isCompleted === false,
        lastAttemptAnswersForm: answersForm || null,
      };

      result.push(catalogItem);
    }

    return result;
  }
}
