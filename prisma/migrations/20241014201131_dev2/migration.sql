/*
  Warnings:

  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `firstTaskListening` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_examId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_moduleId_fkey";

-- DropTable
DROP TABLE "Module";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "firstTaskListening";

-- CreateTable
CREATE TABLE "B1ReadingTask1" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "mainText" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "B1ReadingTask1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingTask1Question" (
    "id" UUID NOT NULL,
    "statement" TEXT NOT NULL,
    "answer" BOOLEAN NOT NULL,
    "b1ReadingTask1Id" UUID NOT NULL,

    CONSTRAINT "ReadingTask1Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B1ReadingTask2A" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "mainText" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "B1ReadingTask2A_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingTask2AQuestion" (
    "id" UUID NOT NULL,
    "statement" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "choices" TEXT[],
    "b1ReadingTask2Id" UUID NOT NULL,

    CONSTRAINT "ReadingTask2AQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B1ReadingTask2B" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "mainText" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "B1ReadingTask2B_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingTask2BQuestion" (
    "id" UUID NOT NULL,
    "statement" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "choices" TEXT[],
    "b1ReadingTask2BId" UUID NOT NULL,

    CONSTRAINT "ReadingTask2BQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingTask3" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "mainText" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "ReadingTask3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingTask3AQuestion" (
    "id" UUID NOT NULL,
    "statement" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "readingTask3Id" UUID NOT NULL,

    CONSTRAINT "ReadingTask3AQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingTask4" (
    "id" UUID NOT NULL,
    "mainQuestion" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "ReadingTask4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingTask4AQuestion" (
    "id" UUID NOT NULL,
    "comment" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "readingTask4Id" UUID NOT NULL,

    CONSTRAINT "ReadingTask4AQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingTask5" (
    "id" UUID NOT NULL,
    "mainQuestion" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "ReadingTask5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingTask5Question" (
    "id" UUID NOT NULL,
    "statement" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "choices" TEXT[],
    "readingTask5Id" UUID NOT NULL,

    CONSTRAINT "ReadingTask5Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingTask1" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "HearingTask1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingTask1Question" (
    "id" UUID NOT NULL,
    "rightOrWrongStatement" TEXT NOT NULL,
    "rightOrWrongAnswer" BOOLEAN NOT NULL,
    "mcStatement" TEXT NOT NULL,
    "mcAnswer" TEXT NOT NULL,
    "hearingTask1Id" UUID NOT NULL,

    CONSTRAINT "HearingTask1Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingTask2" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "HearingTask2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingTask2Question" (
    "id" UUID NOT NULL,
    "statement" TEXT NOT NULL,
    "choices" TEXT[],
    "answer" TEXT NOT NULL,
    "hearingTask2Id" UUID NOT NULL,

    CONSTRAINT "HearingTask2Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingTask3" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "HearingTask3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingTask3Question" (
    "id" UUID NOT NULL,
    "statement" TEXT NOT NULL,
    "answer" BOOLEAN NOT NULL,
    "hearingTask3Id" UUID NOT NULL,

    CONSTRAINT "HearingTask3Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingTask4" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "HearingTask4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingTask4Question" (
    "id" UUID NOT NULL,
    "statement" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "hearingTask4Id" UUID NOT NULL,

    CONSTRAINT "HearingTask4Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exam_name_key" ON "Exam"("name");

-- AddForeignKey
ALTER TABLE "B1ReadingTask1" ADD CONSTRAINT "B1ReadingTask1_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask1Question" ADD CONSTRAINT "ReadingTask1Question_b1ReadingTask1Id_fkey" FOREIGN KEY ("b1ReadingTask1Id") REFERENCES "B1ReadingTask1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1ReadingTask2A" ADD CONSTRAINT "B1ReadingTask2A_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask2AQuestion" ADD CONSTRAINT "ReadingTask2AQuestion_b1ReadingTask2Id_fkey" FOREIGN KEY ("b1ReadingTask2Id") REFERENCES "B1ReadingTask2A"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1ReadingTask2B" ADD CONSTRAINT "B1ReadingTask2B_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask2BQuestion" ADD CONSTRAINT "ReadingTask2BQuestion_b1ReadingTask2BId_fkey" FOREIGN KEY ("b1ReadingTask2BId") REFERENCES "B1ReadingTask2B"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask3" ADD CONSTRAINT "ReadingTask3_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask3AQuestion" ADD CONSTRAINT "ReadingTask3AQuestion_readingTask3Id_fkey" FOREIGN KEY ("readingTask3Id") REFERENCES "ReadingTask3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask4" ADD CONSTRAINT "ReadingTask4_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask4AQuestion" ADD CONSTRAINT "ReadingTask4AQuestion_readingTask4Id_fkey" FOREIGN KEY ("readingTask4Id") REFERENCES "ReadingTask4"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask5" ADD CONSTRAINT "ReadingTask5_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask5Question" ADD CONSTRAINT "ReadingTask5Question_readingTask5Id_fkey" FOREIGN KEY ("readingTask5Id") REFERENCES "ReadingTask5"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask1" ADD CONSTRAINT "HearingTask1_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask1Question" ADD CONSTRAINT "HearingTask1Question_hearingTask1Id_fkey" FOREIGN KEY ("hearingTask1Id") REFERENCES "HearingTask1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask2" ADD CONSTRAINT "HearingTask2_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask2Question" ADD CONSTRAINT "HearingTask2Question_hearingTask2Id_fkey" FOREIGN KEY ("hearingTask2Id") REFERENCES "HearingTask2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask3" ADD CONSTRAINT "HearingTask3_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask3Question" ADD CONSTRAINT "HearingTask3Question_hearingTask3Id_fkey" FOREIGN KEY ("hearingTask3Id") REFERENCES "HearingTask3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask4" ADD CONSTRAINT "HearingTask4_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask4Question" ADD CONSTRAINT "HearingTask4Question_hearingTask4Id_fkey" FOREIGN KEY ("hearingTask4Id") REFERENCES "HearingTask4"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
