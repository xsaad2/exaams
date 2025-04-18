export type ExamCatalogItem = {
  id: string;
  name: string;
  description?: string;
  level: string;
  attemptsCount: number;
  lastAttemptDate: Date;
  lastScore: number | null;
  progress: number | null;
};
