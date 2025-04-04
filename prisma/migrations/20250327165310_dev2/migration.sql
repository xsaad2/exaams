-- CreateTable
CREATE TABLE "AdPoster" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "letter" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "hook" TEXT,
    "body" TEXT,
    "offeredServices" TEXT[],
    "siteUrl" TEXT,
    "contact" TEXT,
    "readingTaskId" INTEGER,

    CONSTRAINT "AdPoster_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdPoster" ADD CONSTRAINT "AdPoster_readingTaskId_fkey" FOREIGN KEY ("readingTaskId") REFERENCES "ReadingTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;
