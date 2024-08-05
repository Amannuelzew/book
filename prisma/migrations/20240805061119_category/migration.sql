/*
  Warnings:

  - You are about to drop the `_BookToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_BookToUser_B_index";

-- DropIndex
DROP INDEX "_BookToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BookToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
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
    "categoryId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DECIMAL NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("createdAt", "id", "title", "updatedAt") SELECT "createdAt", "id", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_userId_title_key" ON "Book"("userId", "title");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'USER',
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "wallet" DECIMAL NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("createdAt", "email", "id", "image", "location", "password", "phoneNumber", "role", "updatedAt") SELECT "createdAt", "email", "id", "image", "location", "password", "phoneNumber", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
