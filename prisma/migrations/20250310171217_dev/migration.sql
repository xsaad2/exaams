/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `B1Exam` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "B1Exam" ADD COLUMN     "readingTask3ImageUrls" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "B1Exam_name_key" ON "B1Exam"("name");
