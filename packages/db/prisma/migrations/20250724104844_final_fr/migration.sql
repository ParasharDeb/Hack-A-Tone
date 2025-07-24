/*
  Warnings:

  - You are about to drop the column `placeId` on the `Story` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_placeId_fkey";

-- DropIndex
DROP INDEX "Story_placeId_key";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "placeId";
