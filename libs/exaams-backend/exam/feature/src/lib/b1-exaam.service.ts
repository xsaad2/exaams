import {PrismaService, ReadingTaskFiles} from '@com.language.exams/exaams-backend/utils';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {B1Exam} from '@prisma/client';
import {Express} from 'express';

// This is a hack to make Multer available in the Express namespace
import {Client} from 'minio';
import {InternalCoreModule} from "@nestjs/core/injector/internal-core-module";

type File = Express.Multer.File;

@Injectable()
export class B1ExaamService {
  private minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
  });

  constructor(private prismaService: PrismaService) {
  }

  async createB1Exaam(exaam: any, files: ReadingTaskFiles) {
    try {
      if (!files || !files.audioTrack || !files.audioTrack[0]) {
        throw new InternalServerErrorException('Audio track file is missing')
      }
      if (!files || !files.readingTask3Image || !files.readingTask3Image[0]) {
        throw new InternalServerErrorException('readingTask3Image file is missing');
      }
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
        hearingTask4
      } = exaam;


      // Upload audio file
      await this.minioClient.putObject(process.env.MINIO_AUDIO_BUCKET, `${name}-audioTrack`, files.audioTrack[0].buffer);
      await this.minioClient.putObject(process.env.MINIO_IMAGES_BUCKET, `${name}-readingTask3Image`, files.readingTask3Image[0].buffer);

      return this.prismaService.b1Exam.create({
        data: {
          name,
          createdAt: new Date(createdAt),
          creator: {
            connectOrCreate: {
              where: {
                email: 'saad.belkhou@gmail.com'
              },
              create: {
                createdAt: new Date(createdAt),
                name: 'saad',
                email: 'saad.belkhou@gmail.com'
              }
            }
          },
          deletedAt: deletedAt ? new Date(deletedAt) : null,
          readingTask1: this.createReadingTask(readingTask1, files.readingTask1Image),
          readingTask2a: this.createReadingTask(readingTask2a, files.readingTask2aImage),
          readingTask2b: this.createReadingTask(readingTask2b, files.readingTask2bImage),
          readingTask3: this.createReadingTask(readingTask3, files.readingTask3Image),
          readingTask4: this.createReadingTask(readingTask4, files.readingTask4Image),
          readingTask5: this.createReadingTask(readingTask5, files.readingTask5Image),
          hearingTask1: this.createHearingTask(hearingTask1),
          hearingTask2: this.createHearingTask(hearingTask2),
          hearingTask3: this.createHearingTask(hearingTask3),
          hearingTask4: this.createHearingTask(hearingTask4)
        }
      });
    } catch (e){
      console.error('Error while creating Exam', e);
      throw new InternalServerErrorException('Error while creating Exam', { cause: e });
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
            questionText: q.questionText
          }))
        },
        imagesContents: file ? {
          create: {
            name: file[0].originalname,
            imageData: file[0].buffer
          }
        } : undefined

      }
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
            correctAnswer: q.correctAnswer
          }))
        }
      }
    };
  }

  async getAllExaams() {
    const res = await this.prismaService.b1Exam.findMany({
      include: {
        creator: true,
        readingTask1: {
          include: {
            questions: true
          }
        },
        readingTask2a: {
          include: {
            questions: true
          }
        },
        readingTask2b: {
          include: {
            questions: true
          }
        },
        readingTask3: {
          include: {
            questions: true,
            imagesContents: true

          }
        },
        readingTask4: {
          include: {
            questions: true
          }
        },
        readingTask5: {
          include: {
            questions: true
          }
        },
        hearingTask1: {
          include: {
            questions: true
          }
        },
        hearingTask2: {
          include: {
            questions: true
          }
        },
        hearingTask3: {
          include: {
            questions: true
          }
        },
        hearingTask4: {
          include: {
            questions: true
          }
        }
      }
    });
    return await Promise.all(
      res.map(async (e) => {
        e.audioTrackUrl = await this.minioClient.presignedUrl('GET', process.env.MINIO_AUDIO_BUCKET, `${e.name}-audioTrack`);
        e.readingTask3ImageUrls = await this.minioClient.presignedUrl('GET', process.env.MINIO_IMAGES_BUCKET, `${e.name}-readingTask3Image`);
        return e;
      })
    );
  }

  async getExaamByName(name: string) {
    const exam = await this.prismaService.b1Exam.findUnique({
      where: {
        name: name
      },
      include: {
        creator: true,
        readingTask1: true,
        readingTask2a: true,
        readingTask2b: true,
        readingTask3: true,
        readingTask4: true,
        readingTask5: true,
        hearingTask1: true,
        hearingTask2: true,
        hearingTask3: true,
        hearingTask4: true
      }
    });
    const presignedUrl = await this.minioClient.presignedUrl('GET', process.env.MINIO_AUDIO_BUCKET, `${exam.name}-audioTrack`);
    return {
      ...exam,
      audioTrackUrl: presignedUrl
    };
  }
}
