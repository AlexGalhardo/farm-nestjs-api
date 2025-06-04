/*
  Warnings:

  - Added the required column `useArableArea` to the `crops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "crops" ADD COLUMN     "useArableArea" INTEGER NOT NULL;
