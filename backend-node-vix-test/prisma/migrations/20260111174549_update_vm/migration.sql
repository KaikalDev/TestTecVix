/*
  Warnings:

  - You are about to drop the column `location` on the `vM` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `vM` DROP COLUMN `location`,
    ADD COLUMN `vmLocalization` ENUM('bre_barueri', 'usa_miami') NOT NULL DEFAULT 'bre_barueri';
