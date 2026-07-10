/*
  Warnings:

  - You are about to drop the column `cabinNumber` on the `CoachModelSeat` table. All the data in the column will be lost.
  - You are about to drop the column `seatNumber` on the `CoachModelSeat` table. All the data in the column will be lost.
  - You are about to drop the column `x` on the `CoachModelSeat` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `CoachModelSeat` table. All the data in the column will be lost.
  - You are about to drop the column `cabinId` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `seatNumber` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the `Cabin` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[coachId,label]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `CoachModelSeat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `side` to the `CoachModelSeat` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `label` on the `CoachModelSeat` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `row` to the `CoachModelSeat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `side` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `label` on the `Seat` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `row` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SeatSide" AS ENUM ('LEFT', 'RIGHT');

-- DropForeignKey
ALTER TABLE "Cabin" DROP CONSTRAINT "Cabin_coachId_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_cabinId_fkey";

-- AlterTable
ALTER TABLE "CoachModel" ALTER COLUMN "layoutType" SET DEFAULT 'SEAT';

-- AlterTable
ALTER TABLE "CoachModelSeat" DROP COLUMN "cabinNumber",
DROP COLUMN "seatNumber",
DROP COLUMN "x",
DROP COLUMN "y",
ADD COLUMN     "position" INTEGER NOT NULL,
ADD COLUMN     "side" "SeatSide" NOT NULL,
DROP COLUMN "label",
ADD COLUMN     "label" INTEGER NOT NULL,
DROP COLUMN "row",
ADD COLUMN     "row" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "cabinId",
DROP COLUMN "seatNumber",
ADD COLUMN     "position" INTEGER NOT NULL,
ADD COLUMN     "seatType" "SeatType",
ADD COLUMN     "side" "SeatSide" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "label",
ADD COLUMN     "label" INTEGER NOT NULL,
DROP COLUMN "row",
ADD COLUMN     "row" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Cabin";

-- CreateIndex
CREATE UNIQUE INDEX "CoachModelSeat_coachModelId_label_key" ON "CoachModelSeat"("coachModelId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_coachId_label_key" ON "Seat"("coachId", "label");
