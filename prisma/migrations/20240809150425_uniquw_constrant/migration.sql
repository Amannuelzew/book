/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `Rental` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rental_userId_id_key" ON "Rental"("userId", "id");
