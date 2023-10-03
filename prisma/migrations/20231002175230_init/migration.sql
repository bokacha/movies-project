/*
  Warnings:

  - Added the required column `description` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movie" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "runtime" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
