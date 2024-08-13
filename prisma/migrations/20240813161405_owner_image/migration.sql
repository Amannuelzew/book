-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "image" TEXT NOT NULL DEFAULT '/default.png';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" SET DEFAULT '/default.png';
