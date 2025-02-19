import { Prisma } from '@prisma/client';
import { Express } from 'express';
import { Multer } from 'multer';

export type File = Express.Multer.File;

export type ReadingTaskFiles = {
  readingTask1Image?: File;
  readingTask2aImage?: File;
  readingTask2bImage?: File;
  readingTask3Image?: File;
  readingTask4Image?: File;
  readingTask5Image?: File;
  audioTrack?: File;
}

export type B1ExamWithTasks = Prisma.B1ExamGetPayload<{
  include: {
    readingTask1: true;
    readingTask2a: true;
    readingTask2b: true;
    readingTask3: true;
    readingTask4: true;
    readingTask5: true;
    hearingTask1: true;
    hearingTask2: true;
    hearingTask3: true;
    hearingTask4: true;
    audioTrack: true;
  }
}>

export type ReadingTaskWithQuestions = Prisma.ReadingTaskGetPayload<{
  include: {
    questions: true;
  }
}>
