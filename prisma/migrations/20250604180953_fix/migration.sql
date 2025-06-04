/*
  Warnings:

  - Changed the type of `season` on the `crops` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "crops" DROP COLUMN "season",
ADD COLUMN     "season" INTEGER NOT NULL;
