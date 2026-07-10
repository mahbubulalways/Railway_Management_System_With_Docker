-- CreateEnum
CREATE TYPE "CoachType" AS ENUM ('AC_CHAIR', 'SHOVON_CHAIR', 'AC_CABIN', 'CABIN', 'SLEEPER');

-- CreateEnum
CREATE TYPE "SeatSide" AS ENUM ('LEFT', 'RIGHT');

-- CreateTable
CREATE TABLE "trains" (
    "id" TEXT NOT NULL,
    "trainNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "engineType" TEXT,
    "maxSpeed" INTEGER,
    "manufactureYear" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coaches" (
    "id" TEXT NOT NULL,
    "coachCode" TEXT NOT NULL,
    "type" "CoachType" NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "leftColumns" INTEGER,
    "rightColumns" INTEGER,
    "hasAC" BOOLEAN NOT NULL DEFAULT false,
    "hasWashroom" BOOLEAN NOT NULL DEFAULT false,
    "hasChargingPort" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "train_coaches" (
    "id" TEXT NOT NULL,
    "trainId" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "train_coaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "side" "SeatSide" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sourceStationId" TEXT NOT NULL,
    "destinationStationId" TEXT NOT NULL,
    "distance" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_stations" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "travelTimeFromPrevious" INTEGER,
    "defaultStopTime" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "route_stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "trainId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "journeyDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Scheduled',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_stops" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "routeStationId" TEXT NOT NULL,
    "platformId" TEXT,
    "arrivalTime" TIMESTAMP(3),
    "departureTime" TIMESTAMP(3),
    "delayMinutes" INTEGER NOT NULL DEFAULT 0,
    "remarks" TEXT,

    CONSTRAINT "schedule_stops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trains_trainNumber_key" ON "trains"("trainNumber");

-- CreateIndex
CREATE UNIQUE INDEX "coaches_coachCode_key" ON "coaches"("coachCode");

-- CreateIndex
CREATE UNIQUE INDEX "train_coaches_trainId_sequence_key" ON "train_coaches"("trainId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "train_coaches_trainId_coachId_key" ON "train_coaches"("trainId", "coachId");

-- CreateIndex
CREATE UNIQUE INDEX "seats_coachId_seatNumber_key" ON "seats"("coachId", "seatNumber");

-- CreateIndex
CREATE UNIQUE INDEX "routes_routeId_key" ON "routes"("routeId");

-- CreateIndex
CREATE UNIQUE INDEX "route_stations_routeId_sequence_key" ON "route_stations"("routeId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "route_stations_routeId_stationId_key" ON "route_stations"("routeId", "stationId");

-- AddForeignKey
ALTER TABLE "train_coaches" ADD CONSTRAINT "train_coaches_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "trains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "train_coaches" ADD CONSTRAINT "train_coaches_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coaches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coaches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_sourceStationId_fkey" FOREIGN KEY ("sourceStationId") REFERENCES "stations"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_destinationStationId_fkey" FOREIGN KEY ("destinationStationId") REFERENCES "stations"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_stations" ADD CONSTRAINT "route_stations_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_stations" ADD CONSTRAINT "route_stations_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "trains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_stops" ADD CONSTRAINT "schedule_stops_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_stops" ADD CONSTRAINT "schedule_stops_routeStationId_fkey" FOREIGN KEY ("routeStationId") REFERENCES "route_stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_stops" ADD CONSTRAINT "schedule_stops_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platforms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
