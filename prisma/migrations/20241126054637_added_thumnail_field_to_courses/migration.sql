/*
  Warnings:

  - Added the required column `thumbnail` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "thumbnail" TEXT NOT NULL;
