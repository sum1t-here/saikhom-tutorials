/*
  Warnings:

  - You are about to drop the column `userId` on the `Courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_userId_fkey";

-- DropIndex
DROP INDEX "Courses_userId_idx";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "userId";
