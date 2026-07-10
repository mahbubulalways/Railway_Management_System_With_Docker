-- CreateTable
CREATE TABLE "cabins" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "cabinNumber" TEXT NOT NULL,
    "peoples" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cabins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cabins_coachId_cabinNumber_key" ON "cabins"("coachId", "cabinNumber");

-- AddForeignKey
ALTER TABLE "cabins" ADD CONSTRAINT "cabins_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coaches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
