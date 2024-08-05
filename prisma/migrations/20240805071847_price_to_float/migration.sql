/*
  Warnings:

  - You are about to alter the column `price` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
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
    "categoryId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" REAL NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("approved", "author", "categoryId", "createdAt", "id", "price", "quantity", "title", "updatedAt", "url", "userId") SELECT "approved", "author", "categoryId", "createdAt", "id", "price", "quantity", "title", "updatedAt", "url", "userId" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_userId_title_key" ON "Book"("userId", "title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
