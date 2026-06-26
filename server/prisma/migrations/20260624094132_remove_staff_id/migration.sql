/*
  Warnings:

  - You are about to drop the column `staffId` on the `StaffPermission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[staffTypeId,permissionId]` on the table `StaffPermission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StaffPermission_staffId_permissionId_key";

-- AlterTable
ALTER TABLE "StaffPermission" DROP COLUMN "staffId";

-- CreateIndex
CREATE UNIQUE INDEX "StaffPermission_staffTypeId_permissionId_key" ON "StaffPermission"("staffTypeId", "permissionId");
