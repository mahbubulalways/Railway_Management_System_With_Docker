/*
  Warnings:

  - You are about to drop the column `defaultStopTime` on the `route_stations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "route_stations" DROP COLUMN "defaultStopTime",
ADD COLUMN     "stopTime" INTEGER NOT NULL DEFAULT 2;
