-- AlterTable
ALTER TABLE "coach_models" ADD COLUMN     "minimumFare" DECIMAL(10,2),
ADD COLUMN     "pricePerKm" DECIMAL(10,2) NOT NULL DEFAULT 5;
