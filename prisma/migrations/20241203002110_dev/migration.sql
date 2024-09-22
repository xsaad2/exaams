/*
  Warnings:

  - You are about to drop the `B1HearingTask1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `B1HearingTask2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `B1HearingTask3` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `B1HearingTask4` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `B1ReadingTask1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `B1ReadingTask2A` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `B1ReadingTask2B` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `B1ReadingTask3` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `B1ReadingTask4` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `B1ReadingTask5` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HearingTask1Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HearingTask2Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HearingTask3Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HearingTask4Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingTask1Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingTask2AQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingTask2BQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingTask3AQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingTask4AQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingTask5Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "B1HearingTask1" DROP CONSTRAINT "B1HearingTask1_examId_fkey";

-- DropForeignKey
ALTER TABLE "B1HearingTask2" DROP CONSTRAINT "B1HearingTask2_examId_fkey";

-- DropForeignKey
ALTER TABLE "B1HearingTask3" DROP CONSTRAINT "B1HearingTask3_examId_fkey";

-- DropForeignKey
ALTER TABLE "B1HearingTask4" DROP CONSTRAINT "B1HearingTask4_examId_fkey";

-- DropForeignKey
ALTER TABLE "B1ReadingTask1" DROP CONSTRAINT "B1ReadingTask1_examId_fkey";

-- DropForeignKey
ALTER TABLE "B1ReadingTask2A" DROP CONSTRAINT "B1ReadingTask2A_examId_fkey";

-- DropForeignKey
ALTER TABLE "B1ReadingTask2B" DROP CONSTRAINT "B1ReadingTask2B_examId_fkey";

-- DropForeignKey
ALTER TABLE "B1ReadingTask3" DROP CONSTRAINT "B1ReadingTask3_examId_fkey";

-- DropForeignKey
ALTER TABLE "B1ReadingTask4" DROP CONSTRAINT "B1ReadingTask4_examId_fkey";

-- DropForeignKey
ALTER TABLE "B1ReadingTask5" DROP CONSTRAINT "B1ReadingTask5_examId_fkey";

-- DropForeignKey
ALTER TABLE "HearingTask1Question" DROP CONSTRAINT "HearingTask1Question_hearingTask1Id_fkey";

-- DropForeignKey
ALTER TABLE "HearingTask2Question" DROP CONSTRAINT "HearingTask2Question_hearingTask2Id_fkey";

-- DropForeignKey
ALTER TABLE "HearingTask3Question" DROP CONSTRAINT "HearingTask3Question_hearingTask3Id_fkey";

-- DropForeignKey
ALTER TABLE "HearingTask4Question" DROP CONSTRAINT "HearingTask4Question_hearingTask4Id_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask1Question" DROP CONSTRAINT "ReadingTask1Question_b1ReadingTask1Id_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask2AQuestion" DROP CONSTRAINT "ReadingTask2AQuestion_b1ReadingTask2Id_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask2BQuestion" DROP CONSTRAINT "ReadingTask2BQuestion_b1ReadingTask2BId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask3AQuestion" DROP CONSTRAINT "ReadingTask3AQuestion_readingTask3Id_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask4AQuestion" DROP CONSTRAINT "ReadingTask4AQuestion_readingTask4Id_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask5Question" DROP CONSTRAINT "ReadingTask5Question_readingTask5Id_fkey";

-- DropTable
DROP TABLE "B1HearingTask1";

-- DropTable
DROP TABLE "B1HearingTask2";

-- DropTable
DROP TABLE "B1HearingTask3";

-- DropTable
DROP TABLE "B1HearingTask4";

-- DropTable
DROP TABLE "B1ReadingTask1";

-- DropTable
DROP TABLE "B1ReadingTask2A";

-- DropTable
DROP TABLE "B1ReadingTask2B";

-- DropTable
DROP TABLE "B1ReadingTask3";

-- DropTable
DROP TABLE "B1ReadingTask4";

-- DropTable
DROP TABLE "B1ReadingTask5";

-- DropTable
DROP TABLE "HearingTask1Question";

-- DropTable
DROP TABLE "HearingTask2Question";

-- DropTable
DROP TABLE "HearingTask3Question";

-- DropTable
DROP TABLE "HearingTask4Question";

-- DropTable
DROP TABLE "ReadingTask1Question";

-- DropTable
DROP TABLE "ReadingTask2AQuestion";

-- DropTable
DROP TABLE "ReadingTask2BQuestion";

-- DropTable
DROP TABLE "ReadingTask3AQuestion";

-- DropTable
DROP TABLE "ReadingTask4AQuestion";

-- DropTable
DROP TABLE "ReadingTask5Question";

-- CreateTable
CREATE TABLE "ReadingTask" (
    "id" UUID NOT NULL,
    "taskNumber" TEXT NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "mainText" TEXT NOT NULL,
    "taskType" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "ReadingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingQuestion" (
    "id" UUID NOT NULL,
    "questionNumber" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "choices" TEXT[],
    "readingTaskId" UUID NOT NULL,

    CONSTRAINT "ReadingQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingTask" (
    "id" UUID NOT NULL,
    "taskNumber" TEXT NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "taskType" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "HearingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingQuestion" (
    "id" UUID NOT NULL,
    "questionNumber" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "choices" TEXT[],
    "hearingTaskId" UUID NOT NULL,

    CONSTRAINT "HearingQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadingTask" ADD CONSTRAINT "ReadingTask_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingQuestion" ADD CONSTRAINT "ReadingQuestion_readingTaskId_fkey" FOREIGN KEY ("readingTaskId") REFERENCES "ReadingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask" ADD CONSTRAINT "HearingTask_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingQuestion" ADD CONSTRAINT "HearingQuestion_hearingTaskId_fkey" FOREIGN KEY ("hearingTaskId") REFERENCES "HearingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
