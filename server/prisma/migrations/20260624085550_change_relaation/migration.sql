/*
  Warnings:

  - You are about to drop the column `staffType` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `staffTypeId` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StaffPermission" DROP CONSTRAINT "StaffPermission_staffId_fkey";

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "staffType",
ADD COLUMN     "staffTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StaffPermission" ADD COLUMN     "staffTypeId" TEXT;

-- DropEnum
DROP TYPE "StaffType";

-- CreateTable
CREATE TABLE "StaffType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffType_type_key" ON "StaffType"("type");

-- AddForeignKey
ALTER TABLE "StaffPermission" ADD CONSTRAINT "StaffPermission_staffTypeId_fkey" FOREIGN KEY ("staffTypeId") REFERENCES "StaffType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_staffTypeId_fkey" FOREIGN KEY ("staffTypeId") REFERENCES "StaffType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
