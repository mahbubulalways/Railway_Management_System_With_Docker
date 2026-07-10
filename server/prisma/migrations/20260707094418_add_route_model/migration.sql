/*
  Warnings:

  - You are about to drop the column `routeId` on the `routes` table. All the data in the column will be lost.
  - You are about to drop the column `journeyDate` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `engineType` on the `trains` table. All the data in the column will be lost.
  - You are about to drop the column `trainNumber` on the `trains` table. All the data in the column will be lost.
  - You are about to drop the `schedule_stops` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[trainId]` on the table `trains` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `route_stations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingOpenDays` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direction` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runningDays` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validFrom` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainId` to the `trains` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `trains` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TrainType" AS ENUM ('INTERCITY', 'MAIL', 'EXPRESS', 'LOCAL', 'COMMUTER', 'SPECIAL', 'GOODS');

-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('UP', 'DOWN');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('SCHEDULED', 'RUNNING', 'COMPLETED', 'CANCELLED', 'DELAYED');

-- DropForeignKey
ALTER TABLE "schedule_stops" DROP CONSTRAINT "schedule_stops_platformId_fkey";

-- DropForeignKey
ALTER TABLE "schedule_stops" DROP CONSTRAINT "schedule_stops_routeStationId_fkey";

-- DropForeignKey
ALTER TABLE "schedule_stops" DROP CONSTRAINT "schedule_stops_scheduleId_fkey";

-- DropIndex
DROP INDEX "routes_routeId_key";

-- DropIndex
DROP INDEX "trains_trainNumber_key";

-- AlterTable
ALTER TABLE "coach_model_seats" ADD COLUMN     "coachModelCabinId" TEXT;

-- AlterTable
ALTER TABLE "route_stations" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "distanceFromPrevious" DOUBLE PRECISION,
ADD COLUMN     "distanceFromStart" DOUBLE PRECISION,
ADD COLUMN     "isMajorStop" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "routes" DROP COLUMN "routeId",
ALTER COLUMN "distance" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "journeyDate",
DROP COLUMN "remarks",
DROP COLUMN "status",
ADD COLUMN     "bookingOpenDays" INTEGER NOT NULL,
ADD COLUMN     "direction" "Direction" NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "runningDays" JSONB NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "validFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "validUntil" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "seats" ADD COLUMN     "cabinId" TEXT;

-- AlterTable
ALTER TABLE "trains" DROP COLUMN "engineType",
DROP COLUMN "trainNumber",
ADD COLUMN     "trainId" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "TrainType" NOT NULL;

-- DropTable
DROP TABLE "schedule_stops";

-- CreateTable
CREATE TABLE "trip_instances" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "journeyDate" TIMESTAMP(3) NOT NULL,
    "status" "TripStatus" NOT NULL DEFAULT 'SCHEDULED',
    "remarks" TEXT,
    "totalSeats" INTEGER,
    "availableSeats" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trip_instances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trip_instances_scheduleId_journeyDate_key" ON "trip_instances"("scheduleId", "journeyDate");

-- CreateIndex
CREATE UNIQUE INDEX "trains_trainId_key" ON "trains"("trainId");

-- AddForeignKey
ALTER TABLE "trip_instances" ADD CONSTRAINT "trip_instances_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
