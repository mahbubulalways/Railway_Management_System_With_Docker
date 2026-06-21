/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "stations" (
    "id" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "establishedYear" INTEGER,
    "notes" TEXT,
    "ticketCounter" BOOLEAN NOT NULL DEFAULT false,
    "onlineTicketSupport" BOOLEAN NOT NULL DEFAULT false,
    "foodCourt" BOOLEAN NOT NULL DEFAULT false,
    "parking" BOOLEAN NOT NULL DEFAULT false,
    "hasDisplayBoard" BOOLEAN NOT NULL DEFAULT false,
    "hasAnnouncementSystem" BOOLEAN NOT NULL DEFAULT false,
    "wheelchairAccess" BOOLEAN NOT NULL DEFAULT false,
    "wifi" BOOLEAN NOT NULL DEFAULT false,
    "washroom" BOOLEAN NOT NULL DEFAULT false,
    "atm" BOOLEAN NOT NULL DEFAULT false,
    "securityService" BOOLEAN NOT NULL DEFAULT false,
    "cctv" BOOLEAN NOT NULL DEFAULT false,
    "prayerRoom" BOOLEAN NOT NULL DEFAULT false,
    "escalator" BOOLEAN NOT NULL DEFAULT false,
    "lift" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platforms" (
    "id" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "length" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "hasRoof" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platforms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stations_stationId_key" ON "stations"("stationId");

-- CreateIndex
CREATE UNIQUE INDEX "stations_phone_key" ON "stations"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "stations_email_key" ON "stations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "platforms" ADD CONSTRAINT "platforms_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("stationId") ON DELETE CASCADE ON UPDATE CASCADE;
