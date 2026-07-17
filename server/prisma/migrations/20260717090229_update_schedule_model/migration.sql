/*
  Warnings:

  - The `runningDays` column on the `schedules` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[trainId,direction]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_trainId_fkey";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "runningDays",
ADD COLUMN     "runningDays" "WeekDay"[];

-- CreateIndex
CREATE UNIQUE INDEX "schedules_trainId_direction_key" ON "schedules"("trainId", "direction");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "trains"("trainId") ON DELETE RESTRICT ON UPDATE CASCADE;
