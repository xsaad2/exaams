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
};

export type B1ExamWithTasks = {
  id: string;
  name: string;
  readingTask3ImageUrls?: string;
  readingTask1: ReadingTask;
  readingTask2a: ReadingTask;
  readingTask2b: ReadingTask;
  readingTask3: ReadingTask;
  readingTask4: ReadingTask;
  readingTask5: ReadingTask;
  hearingTask1: HearingTask;
  hearingTask2: HearingTask;
  hearingTask3: HearingTask;
  hearingTask4: HearingTask;
};

export type ReadingTask = {
  id: number;
  taskNumber: string;
  instructions: string;
  textTitle: string;
  textContents: string;
  workTimeInMinutes: number;
  questions: Question[];
  imagesContents?: Image;
  posters?: Poster[];
};

export type Poster = {
  id: string;
  letter: string;
  title: string;
  hook?: string;
  body?: string;
  offeredServices: string[];
  siteUrl?: string;
  contact?: string;
};

export type HearingTask = {
  id: number;
  taskNumber: string;
  instructions: string;
  audioContext: string;
  workTimeInMinutes?: number;
  questions: Question[];
};

export type Question = {
  id: string;
  questionNumber: number;
  statement: string;
  questionText?: string;
  options: string[];
  correctAnswer: string;
};

export type B1AnswersForm = {
  readingTask1: {
    [key: string]: string;
  };
  readingTask2a: {
    [key: string]: string;
  };
  readingTask2b: {
    [key: string]: string;
  };
  readingTask3: {
    [key: string]: string;
  };
  readingTask4: {
    [key: string]: string;
  };
  hearingTask1: {
    [key: string]: string;
  };
  hearingTask2: {
    [key: string]: string;
  };
  hearingTask3: {
    [key: string]: string;
  };
  hearingTask4: {
    [key: string]: string;
  };
};

export type Image = {
  id: string;
  name: string;
  imageData: ArrayBuffer;
};
