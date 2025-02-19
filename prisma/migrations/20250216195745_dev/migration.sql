-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B1Exam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "creatorId" TEXT NOT NULL,
    "readingTask1Id" INTEGER NOT NULL,
    "readingTask2aId" INTEGER NOT NULL,
    "readingTask2bId" INTEGER NOT NULL,
    "readingTask3Id" INTEGER NOT NULL,
    "readingTask4Id" INTEGER NOT NULL,
    "readingTask5Id" INTEGER NOT NULL,
    "hearingTask1Id" INTEGER NOT NULL,
    "hearingTask2Id" INTEGER NOT NULL,
    "hearingTask3Id" INTEGER NOT NULL,
    "hearingTask4Id" INTEGER NOT NULL,

    CONSTRAINT "B1Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingTask" (
    "id" SERIAL NOT NULL,
    "taskNumber" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "textTitle" TEXT,
    "textContents" TEXT,
    "workTimeInMinutes" INTEGER,

    CONSTRAINT "ReadingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HearingTask" (
    "id" SERIAL NOT NULL,
    "taskNumber" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "audioContext" TEXT,

    CONSTRAINT "HearingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "questionNumber" INTEGER NOT NULL,
    "statement" TEXT NOT NULL,
    "questionText" TEXT,
    "options" TEXT[],
    "correctAnswer" TEXT NOT NULL,
    "readingTaskId" INTEGER,
    "hearingTaskId" INTEGER,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "imageData" BYTEA NOT NULL,
    "readingTaskId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audio" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "audioData" BYTEA NOT NULL,
    "examId" TEXT NOT NULL,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "B1Exam_readingTask1Id_key" ON "B1Exam"("readingTask1Id");

-- CreateIndex
CREATE UNIQUE INDEX "B1Exam_readingTask2aId_key" ON "B1Exam"("readingTask2aId");

-- CreateIndex
CREATE UNIQUE INDEX "B1Exam_readingTask2bId_key" ON "B1Exam"("readingTask2bId");

-- CreateIndex
CREATE UNIQUE INDEX "B1Exam_readingTask3Id_key" ON "B1Exam"("readingTask3Id");

-- CreateIndex
CREATE UNIQUE INDEX "B1Exam_readingTask4Id_key" ON "B1Exam"("readingTask4Id");

-- CreateIndex
CREATE UNIQUE INDEX "B1Exam_readingTask5Id_key" ON "B1Exam"("readingTask5Id");

-- CreateIndex
CREATE UNIQUE INDEX "B1Exam_hearingTask1Id_key" ON "B1Exam"("hearingTask1Id");

-- CreateIndex
CREATE UNIQUE INDEX "B1Exam_hearingTask2Id_key" ON "B1Exam"("hearingTask2Id");

-- CreateIndex
CREATE UNIQUE INDEX "B1Exam_hearingTask3Id_key" ON "B1Exam"("hearingTask3Id");

-- CreateIndex
CREATE UNIQUE INDEX "B1Exam_hearingTask4Id_key" ON "B1Exam"("hearingTask4Id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_readingTaskId_key" ON "Image"("readingTaskId");

-- CreateIndex
CREATE UNIQUE INDEX "Audio_examId_key" ON "Audio"("examId");

-- AddForeignKey
ALTER TABLE "B1Exam" ADD CONSTRAINT "B1Exam_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1Exam" ADD CONSTRAINT "B1Exam_readingTask1Id_fkey" FOREIGN KEY ("readingTask1Id") REFERENCES "ReadingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1Exam" ADD CONSTRAINT "B1Exam_readingTask2aId_fkey" FOREIGN KEY ("readingTask2aId") REFERENCES "ReadingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1Exam" ADD CONSTRAINT "B1Exam_readingTask2bId_fkey" FOREIGN KEY ("readingTask2bId") REFERENCES "ReadingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1Exam" ADD CONSTRAINT "B1Exam_readingTask3Id_fkey" FOREIGN KEY ("readingTask3Id") REFERENCES "ReadingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1Exam" ADD CONSTRAINT "B1Exam_readingTask4Id_fkey" FOREIGN KEY ("readingTask4Id") REFERENCES "ReadingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1Exam" ADD CONSTRAINT "B1Exam_readingTask5Id_fkey" FOREIGN KEY ("readingTask5Id") REFERENCES "ReadingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1Exam" ADD CONSTRAINT "B1Exam_hearingTask1Id_fkey" FOREIGN KEY ("hearingTask1Id") REFERENCES "HearingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1Exam" ADD CONSTRAINT "B1Exam_hearingTask2Id_fkey" FOREIGN KEY ("hearingTask2Id") REFERENCES "HearingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1Exam" ADD CONSTRAINT "B1Exam_hearingTask3Id_fkey" FOREIGN KEY ("hearingTask3Id") REFERENCES "HearingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "B1Exam" ADD CONSTRAINT "B1Exam_hearingTask4Id_fkey" FOREIGN KEY ("hearingTask4Id") REFERENCES "HearingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_readingTaskId_fkey" FOREIGN KEY ("readingTaskId") REFERENCES "ReadingTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_hearingTaskId_fkey" FOREIGN KEY ("hearingTaskId") REFERENCES "HearingTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_readingTaskId_fkey" FOREIGN KEY ("readingTaskId") REFERENCES "ReadingTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_examId_fkey" FOREIGN KEY ("examId") REFERENCES "B1Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
