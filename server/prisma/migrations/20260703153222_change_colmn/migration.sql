/*
  Warnings:

  - You are about to drop the column `totalSeats` on the `coaches` table. All the data in the column will be lost.
  - You are about to drop the `coachModelSeats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coachModels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "coachModelSeats" DROP CONSTRAINT "coachModelSeats_coachModelId_fkey";

-- DropForeignKey
ALTER TABLE "coaches" DROP CONSTRAINT "coaches_coachModelId_fkey";

-- AlterTable
ALTER TABLE "coaches" DROP COLUMN "totalSeats";

-- DropTable
DROP TABLE "coachModelSeats";

-- DropTable
DROP TABLE "coachModels";

-- CreateTable
CREATE TABLE "coach_models" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CoachType" NOT NULL,
    "layoutType" "CoachLayoutType" NOT NULL DEFAULT 'SEAT',
    "description" TEXT,
    "totalSeats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_model_seats" (
    "id" TEXT NOT NULL,
    "coachModelId" TEXT NOT NULL,
    "label" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "side" "SeatSide" NOT NULL,
    "position" INTEGER NOT NULL,
    "seatType" "SeatType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coach_model_seats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coach_models_name_key" ON "coach_models"("name");

-- CreateIndex
CREATE UNIQUE INDEX "coach_model_seats_coachModelId_label_key" ON "coach_model_seats"("coachModelId", "label");

-- AddForeignKey
ALTER TABLE "coach_model_seats" ADD CONSTRAINT "coach_model_seats_coachModelId_fkey" FOREIGN KEY ("coachModelId") REFERENCES "coach_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coaches" ADD CONSTRAINT "coaches_coachModelId_fkey" FOREIGN KEY ("coachModelId") REFERENCES "coach_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
