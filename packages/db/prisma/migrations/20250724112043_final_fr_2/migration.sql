/*
  Warnings:

  - You are about to drop the `Mood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mood" DROP CONSTRAINT "Mood_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Mood" DROP CONSTRAINT "Mood_userId_fkey";

-- DropTable
DROP TABLE "Mood";

-- CreateTable
CREATE TABLE "audio" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mood" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "audio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "audio" ADD CONSTRAINT "audio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
