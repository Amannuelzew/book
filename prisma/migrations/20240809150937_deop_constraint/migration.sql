/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Rental` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Rental_userId_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Rental_userId_key" ON "Rental"("userId");
