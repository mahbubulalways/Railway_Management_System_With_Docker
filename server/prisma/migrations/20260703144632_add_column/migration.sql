/*
  Warnings:

  - Added the required column `totalSeats` to the `coaches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coaches" ADD COLUMN     "totalSeats" INTEGER NOT NULL;
