/*
  Warnings:

  - You are about to drop the column `season` on the `crops` table. All the data in the column will be lost.
  - You are about to alter the column `total_area` on the `farms` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `agricultural_area` on the `farms` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `arable_area` on the `farms` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `vegetation_area` on the `farms` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "crops" DROP COLUMN "season";

-- AlterTable
ALTER TABLE "farms" ALTER COLUMN "total_area" SET DATA TYPE INTEGER,
ALTER COLUMN "agricultural_area" SET DATA TYPE INTEGER,
ALTER COLUMN "arable_area" SET DEFAULT 0,
ALTER COLUMN "arable_area" SET DATA TYPE INTEGER,
ALTER COLUMN "vegetation_area" SET DATA TYPE INTEGER;
