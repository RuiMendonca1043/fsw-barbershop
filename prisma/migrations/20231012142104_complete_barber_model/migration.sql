/*
  Warnings:

  - Added the required column `dayOff` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Barber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "dayOff" INTEGER NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
