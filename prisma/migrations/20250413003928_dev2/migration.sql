-- CreateTable
CREATE TABLE "B1ExamAttempt" (
    "attemptId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "examId" TEXT NOT NULL,
    "examName" TEXT NOT NULL,
    "userId" TEXT,
    "score" INTEGER,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "B1ExamAttempt_pkey" PRIMARY KEY ("attemptId")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "itemNumber" TEXT NOT NULL,
    "chosenAnswer" TEXT,
    "isCorrect" BOOLEAN,
    "attemptId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "B1ExamAttempt_attemptId_userId_examId_key" ON "B1ExamAttempt"("attemptId", "userId", "examId");

-- CreateIndex
CREATE INDEX "Answer_attemptId_idx" ON "Answer"("attemptId");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_attemptId_taskName_itemNumber_key" ON "Answer"("attemptId", "taskName", "itemNumber");

-- AddForeignKey
ALTER TABLE "B1ExamAttempt" ADD CONSTRAINT "B1ExamAttempt_examId_fkey" FOREIGN KEY ("examId") REFERENCES "B1Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1ExamAttempt" ADD CONSTRAINT "B1ExamAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "B1ExamAttempt"("attemptId") ON DELETE CASCADE ON UPDATE CASCADE;
