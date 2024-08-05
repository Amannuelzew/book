/*
  Warnings:

  - You are about to drop the column `approved` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `disabled` on the `User` table. All the data in the column will be lost.

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
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" REAL NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "categoryId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("approved", "author", "categoryId", "createdAt", "id", "ownerId", "price", "quantity", "title", "updatedAt", "url") SELECT "approved", "author", "categoryId", "createdAt", "id", "ownerId", "price", "quantity", "title", "updatedAt", "url" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_ownerId_title_key" ON "Book"("ownerId", "title");
CREATE TABLE "new_Owner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Owner" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "Owner";
DROP TABLE "Owner";
ALTER TABLE "new_Owner" RENAME TO "Owner";
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
    "wallet" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("createdAt", "email", "id", "image", "location", "password", "phoneNumber", "role", "updatedAt", "wallet") SELECT "createdAt", "email", "id", "image", "location", "password", "phoneNumber", "role", "updatedAt", "wallet" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
