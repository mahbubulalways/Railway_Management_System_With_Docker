/*
  Warnings:

  - You are about to drop the column `establishedYear` on the `stations` table. All the data in the column will be lost.
  - Added the required column `established` to the `stations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stations" DROP COLUMN "establishedYear",
ADD COLUMN     "established" TIMESTAMP(3) NOT NULL;
