-- CreateEnum
CREATE TYPE "CoachStatus" AS ENUM ('AVAILABLE', 'ASSIGNED', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "coaches" ADD COLUMN     "status" "CoachStatus" NOT NULL DEFAULT 'AVAILABLE';
