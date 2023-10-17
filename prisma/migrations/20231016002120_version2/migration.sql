/*
  Warnings:

  - Added the required column `end` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Scheduling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour` to the `Scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "end" INTEGER NOT NULL,
ADD COLUMN     "start" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Scheduling" ADD COLUMN     "day" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hour" TEXT NOT NULL;
