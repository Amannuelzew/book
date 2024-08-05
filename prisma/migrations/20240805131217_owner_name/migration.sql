/*
  Warnings:

  - Added the required column `name` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Owner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Owner" ("approved", "createdAt", "disabled", "id", "updatedAt", "userId") SELECT "approved", "createdAt", "disabled", "id", "updatedAt", "userId" FROM "Owner";
DROP TABLE "Owner";
ALTER TABLE "new_Owner" RENAME TO "Owner";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
