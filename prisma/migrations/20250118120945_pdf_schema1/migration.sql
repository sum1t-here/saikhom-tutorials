/*
  Warnings:

  - Added the required column `pdfFile` to the `PDF` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PDF" ADD COLUMN     "pdfFile" TEXT NOT NULL;
