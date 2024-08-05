/*
  Warnings:

  - You are about to drop the column `userId` on the `Book` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" REAL NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "categoryId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("approved", "author", "categoryId", "createdAt", "id", "price", "quantity", "title", "updatedAt", "url") SELECT "approved", "author", "categoryId", "createdAt", "id", "price", "quantity", "title", "updatedAt", "url" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_ownerId_title_key" ON "Book"("ownerId", "title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
