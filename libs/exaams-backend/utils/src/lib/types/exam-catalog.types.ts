import { B1AnswersForm } from './b1-answer-form.type';

export type ExamCatalogItem = {
  id: string;
  name: string;
  description?: string;
  level: string;
  attemptsCount: number;
  lastAttemptDate: Date;
  lastScore: number | null;
  progress: number | null;
  openAttempt: boolean;
  lastAttemptAnswersForm?: B1AnswersForm;
};
