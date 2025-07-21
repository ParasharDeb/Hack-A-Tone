/*
  Warnings:

  - You are about to drop the column `userId` on the `Story` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[placeId]` on the table `Story` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Places` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_userId_fkey";

-- AlterTable
ALTER TABLE "Places" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "userId",
ADD COLUMN     "placeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Story_placeId_key" ON "Story"("placeId");

-- AddForeignKey
ALTER TABLE "Places" ADD CONSTRAINT "Places_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
