/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[staffId]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `staffId` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `staffType` on the `Staff` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ShiftType" AS ENUM ('MORNING', 'EVENING', 'NIGHT');

-- CreateEnum
CREATE TYPE "StaffType" AS ENUM ('STATION_MASTER', 'ASSISTANT_STATION_MASTER', 'TICKET_CLERK', 'BOOKING_ASSISTANT', 'TRAIN_GUARD', 'TRAIN_DRIVER', 'SIGNAL_OPERATOR', 'POINTSMAN', 'PLATFORM_SUPERVISOR', 'STATION_CONTROLLER', 'SECURITY_GUARD', 'MAINTENANCE_ENGINEER', 'ELECTRICIAN', 'TRACK_MAINTAINER', 'CLEANER', 'OFFICE_ASSISTANT', 'ACCOUNT_OFFICER', 'HR_OFFICER', 'IT_SUPPORT', 'CUSTOMER_SERVICE_OFFICER');

-- DropIndex
DROP INDEX "Staff_employeeId_key";

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "employeeId",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "dutyEndTime" TEXT,
ADD COLUMN     "dutyStartTime" TEXT,
ADD COLUMN     "resignationDate" TIMESTAMP(3),
ADD COLUMN     "shift" "ShiftType" NOT NULL DEFAULT 'MORNING',
ADD COLUMN     "staffId" TEXT NOT NULL,
DROP COLUMN "staffType",
ADD COLUMN     "staffType" "StaffType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffId_key" ON "Staff"("staffId");
