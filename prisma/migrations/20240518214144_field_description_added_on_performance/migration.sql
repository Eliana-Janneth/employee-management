/*
  Warnings:

  - Added the required column `description` to the `PerformanceEvaluation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HoursWorked" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PerformanceEvaluation" ADD COLUMN     "description" TEXT NOT NULL;
