/*
  Warnings:

  - You are about to drop the `cabins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coaches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seats` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CoachLayoutType" AS ENUM ('SEAT', 'CABIN');

-- CreateEnum
CREATE TYPE "CabinType" AS ENUM ('TWO', 'FOUR', 'SIX');

-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('WINDOW', 'AISLE', 'MIDDLE', 'LOWER', 'UPPER', 'SIDE_LOWER', 'SIDE_UPPER');

-- CreateEnum
CREATE TYPE "SeatStatus" AS ENUM ('AVAILABLE', 'BOOKED', 'BLOCKED');

-- DropForeignKey
ALTER TABLE "cabins" DROP CONSTRAINT "cabins_coachId_fkey";

-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_coachId_fkey";

-- DropForeignKey
ALTER TABLE "train_coaches" DROP CONSTRAINT "train_coaches_coachId_fkey";

-- DropTable
DROP TABLE "cabins";

-- DropTable
DROP TABLE "coaches";

-- DropTable
DROP TABLE "seats";

-- DropEnum
DROP TYPE "SeatSide";

-- CreateTable
CREATE TABLE "CoachModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CoachType" NOT NULL,
    "layoutType" "CoachLayoutType" NOT NULL,
    "description" TEXT,
    "totalSeats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachModelSeat" (
    "id" TEXT NOT NULL,
    "coachModelId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "row" TEXT,
    "seatNumber" INTEGER,
    "cabinNumber" TEXT,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "seatType" "SeatType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoachModelSeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coach" (
    "id" TEXT NOT NULL,
    "coachNumber" TEXT NOT NULL,
    "coachModelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "cabinId" TEXT,
    "label" TEXT NOT NULL,
    "row" TEXT,
    "seatNumber" INTEGER,
    "status" "SeatStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cabin" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "cabinNumber" TEXT NOT NULL,
    "type" "CabinType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cabin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoachModel_name_key" ON "CoachModel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoachModelSeat_coachModelId_label_key" ON "CoachModelSeat"("coachModelId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_coachNumber_key" ON "Coach"("coachNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Cabin_coachId_cabinNumber_key" ON "Cabin"("coachId", "cabinNumber");

-- AddForeignKey
ALTER TABLE "CoachModelSeat" ADD CONSTRAINT "CoachModelSeat_coachModelId_fkey" FOREIGN KEY ("coachModelId") REFERENCES "CoachModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_coachModelId_fkey" FOREIGN KEY ("coachModelId") REFERENCES "CoachModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_cabinId_fkey" FOREIGN KEY ("cabinId") REFERENCES "Cabin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "train_coaches" ADD CONSTRAINT "train_coaches_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cabin" ADD CONSTRAINT "Cabin_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;
