/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coach` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoachModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoachModelSeat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StaffPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Coach" DROP CONSTRAINT "Coach_coachModelId_fkey";

-- DropForeignKey
ALTER TABLE "CoachModelSeat" DROP CONSTRAINT "CoachModelSeat_coachModelId_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_coachId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_userId_fkey";

-- DropForeignKey
ALTER TABLE "StaffPermission" DROP CONSTRAINT "StaffPermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "StaffPermission" DROP CONSTRAINT "StaffPermission_staffTypeId_fkey";

-- DropForeignKey
ALTER TABLE "train_coaches" DROP CONSTRAINT "train_coaches_coachId_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Coach";

-- DropTable
DROP TABLE "CoachModel";

-- DropTable
DROP TABLE "CoachModelSeat";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "Seat";

-- DropTable
DROP TABLE "StaffPermission";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_permission" (
    "id" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "staffTypeId" TEXT,

    CONSTRAINT "staff_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "USER_ROLE" NOT NULL DEFAULT 'PESSENGER',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "USER_STATUS" NOT NULL DEFAULT 'INACTIVE',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "joiningDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coachModels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CoachType" NOT NULL,
    "layoutType" "CoachLayoutType" NOT NULL DEFAULT 'SEAT',
    "description" TEXT,
    "totalSeats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coachModels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coachModelSeats" (
    "id" TEXT NOT NULL,
    "coachModelId" TEXT NOT NULL,
    "label" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "side" "SeatSide" NOT NULL,
    "position" INTEGER NOT NULL,
    "seatType" "SeatType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coachModelSeats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coaches" (
    "id" TEXT NOT NULL,
    "coachCode" TEXT NOT NULL,
    "coachNumber" TEXT NOT NULL,
    "coachModelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "label" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "side" "SeatSide" NOT NULL,
    "position" INTEGER NOT NULL,
    "seatType" "SeatType",
    "status" "SeatStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_permission_staffTypeId_permissionId_key" ON "staff_permission"("staffTypeId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "admins_userId_key" ON "admins"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "coachModels_name_key" ON "coachModels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "coachModelSeats_coachModelId_label_key" ON "coachModelSeats"("coachModelId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "coaches_coachCode_key" ON "coaches"("coachCode");

-- CreateIndex
CREATE UNIQUE INDEX "seats_coachId_label_key" ON "seats"("coachId", "label");

-- AddForeignKey
ALTER TABLE "staff_permission" ADD CONSTRAINT "staff_permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_permission" ADD CONSTRAINT "staff_permission_staffTypeId_fkey" FOREIGN KEY ("staffTypeId") REFERENCES "StaffType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coachModelSeats" ADD CONSTRAINT "coachModelSeats_coachModelId_fkey" FOREIGN KEY ("coachModelId") REFERENCES "coachModels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coaches" ADD CONSTRAINT "coaches_coachModelId_fkey" FOREIGN KEY ("coachModelId") REFERENCES "coachModels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coaches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "train_coaches" ADD CONSTRAINT "train_coaches_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coaches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
