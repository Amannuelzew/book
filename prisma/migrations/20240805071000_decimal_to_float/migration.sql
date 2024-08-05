/*
  Warnings:

  - You are about to alter the column `wallet` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "wallet" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("approved", "createdAt", "disabled", "email", "id", "image", "location", "password", "phoneNumber", "role", "updatedAt", "wallet") SELECT "approved", "createdAt", "disabled", "email", "id", "image", "location", "password", "phoneNumber", "role", "updatedAt", "wallet" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
