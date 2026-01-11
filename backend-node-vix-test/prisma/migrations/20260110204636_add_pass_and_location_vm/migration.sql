/*
  Warnings:

  - Added the required column `location` to the `vM` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pass` to the `vM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vM` ADD COLUMN `location` ENUM('bre_barueri', 'usa_miami') NOT NULL,
    ADD COLUMN `pass` VARCHAR(191) NOT NULL;
