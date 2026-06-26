-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_stationId_fkey";

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;
