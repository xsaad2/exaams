import {Prisma} from '@prisma/client';
import {Express} from 'express';
import {Multer} from 'multer';

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

export type B1ExamWithTasks = {
  id: string,
  name: string,
  readingTask1: ReadingTask;
  readingTask2a: ReadingTask;
  readingTask2b: ReadingTask;
  readingTask3: ReadingTask;
  readingTask4: ReadingTask;
  readingTask5: ReadingTask;
  hearingTask1: ReadingTask;
  hearingTask2: ReadingTask;
  hearingTask3: ReadingTask;
  hearingTask4: ReadingTask;
}

export type ReadingTask = {
  id: string;
  taskNumber: string;
  instructions: string;
  textTitle: string;
  textContents: string;
  workTimeInMinutes: number;
  questions: Question[];
  image: Image;
}

export type Question = {
  id: string;
  questionNumber: number;
  statement: string;
  questionText?: string;
  options: string;
  correctAnswer: string;
}

export type Image = {
  id: string;
  name: string;
  imageData: string;
}
