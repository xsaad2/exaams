/*
  Warnings:

  - You are about to drop the `HearingTask1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HearingTask2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HearingTask3` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HearingTask4` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingTask3` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingTask4` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingTask5` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[examId]` on the table `B1ReadingTask1` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[examId]` on the table `B1ReadingTask2A` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[examId]` on the table `B1ReadingTask2B` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "HearingTask1" DROP CONSTRAINT "HearingTask1_examId_fkey";

-- DropForeignKey
ALTER TABLE "HearingTask1Question" DROP CONSTRAINT "HearingTask1Question_hearingTask1Id_fkey";

-- DropForeignKey
ALTER TABLE "HearingTask2" DROP CONSTRAINT "HearingTask2_examId_fkey";

-- DropForeignKey
ALTER TABLE "HearingTask2Question" DROP CONSTRAINT "HearingTask2Question_hearingTask2Id_fkey";

-- DropForeignKey
ALTER TABLE "HearingTask3" DROP CONSTRAINT "HearingTask3_examId_fkey";

-- DropForeignKey
ALTER TABLE "HearingTask3Question" DROP CONSTRAINT "HearingTask3Question_hearingTask3Id_fkey";

-- DropForeignKey
ALTER TABLE "HearingTask4" DROP CONSTRAINT "HearingTask4_examId_fkey";

-- DropForeignKey
ALTER TABLE "HearingTask4Question" DROP CONSTRAINT "HearingTask4Question_hearingTask4Id_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask3" DROP CONSTRAINT "ReadingTask3_examId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask3AQuestion" DROP CONSTRAINT "ReadingTask3AQuestion_readingTask3Id_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask4" DROP CONSTRAINT "ReadingTask4_examId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask4AQuestion" DROP CONSTRAINT "ReadingTask4AQuestion_readingTask4Id_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask5" DROP CONSTRAINT "ReadingTask5_examId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingTask5Question" DROP CONSTRAINT "ReadingTask5Question_readingTask5Id_fkey";

-- DropTable
DROP TABLE "HearingTask1";

-- DropTable
DROP TABLE "HearingTask2";

-- DropTable
DROP TABLE "HearingTask3";

-- DropTable
DROP TABLE "HearingTask4";

-- DropTable
DROP TABLE "ReadingTask3";

-- DropTable
DROP TABLE "ReadingTask4";

-- DropTable
DROP TABLE "ReadingTask5";

-- CreateTable
CREATE TABLE "B1ReadingTask3" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "mainText" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "B1ReadingTask3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B1ReadingTask4" (
    "id" UUID NOT NULL,
    "mainQuestion" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "B1ReadingTask4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B1ReadingTask5" (
    "id" UUID NOT NULL,
    "mainQuestion" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "B1ReadingTask5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B1HearingTask1" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "B1HearingTask1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B1HearingTask2" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "B1HearingTask2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B1HearingTask3" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "B1HearingTask3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B1HearingTask4" (
    "id" UUID NOT NULL,
    "timeAllocationInMinutes" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "examId" UUID NOT NULL,

    CONSTRAINT "B1HearingTask4_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "B1ReadingTask3_examId_key" ON "B1ReadingTask3"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "B1ReadingTask4_examId_key" ON "B1ReadingTask4"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "B1ReadingTask5_examId_key" ON "B1ReadingTask5"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "B1HearingTask1_examId_key" ON "B1HearingTask1"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "B1HearingTask2_examId_key" ON "B1HearingTask2"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "B1HearingTask3_examId_key" ON "B1HearingTask3"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "B1HearingTask4_examId_key" ON "B1HearingTask4"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "B1ReadingTask1_examId_key" ON "B1ReadingTask1"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "B1ReadingTask2A_examId_key" ON "B1ReadingTask2A"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "B1ReadingTask2B_examId_key" ON "B1ReadingTask2B"("examId");

-- AddForeignKey
ALTER TABLE "B1ReadingTask3" ADD CONSTRAINT "B1ReadingTask3_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask3AQuestion" ADD CONSTRAINT "ReadingTask3AQuestion_readingTask3Id_fkey" FOREIGN KEY ("readingTask3Id") REFERENCES "B1ReadingTask3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1ReadingTask4" ADD CONSTRAINT "B1ReadingTask4_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask4AQuestion" ADD CONSTRAINT "ReadingTask4AQuestion_readingTask4Id_fkey" FOREIGN KEY ("readingTask4Id") REFERENCES "B1ReadingTask4"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1ReadingTask5" ADD CONSTRAINT "B1ReadingTask5_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingTask5Question" ADD CONSTRAINT "ReadingTask5Question_readingTask5Id_fkey" FOREIGN KEY ("readingTask5Id") REFERENCES "B1ReadingTask5"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1HearingTask1" ADD CONSTRAINT "B1HearingTask1_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask1Question" ADD CONSTRAINT "HearingTask1Question_hearingTask1Id_fkey" FOREIGN KEY ("hearingTask1Id") REFERENCES "B1HearingTask1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1HearingTask2" ADD CONSTRAINT "B1HearingTask2_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask2Question" ADD CONSTRAINT "HearingTask2Question_hearingTask2Id_fkey" FOREIGN KEY ("hearingTask2Id") REFERENCES "B1HearingTask2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1HearingTask3" ADD CONSTRAINT "B1HearingTask3_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask3Question" ADD CONSTRAINT "HearingTask3Question_hearingTask3Id_fkey" FOREIGN KEY ("hearingTask3Id") REFERENCES "B1HearingTask3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1HearingTask4" ADD CONSTRAINT "B1HearingTask4_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HearingTask4Question" ADD CONSTRAINT "HearingTask4Question_hearingTask4Id_fkey" FOREIGN KEY ("hearingTask4Id") REFERENCES "B1HearingTask4"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
