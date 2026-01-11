-- AlterTable
ALTER TABLE `vM` MODIFY `location` ENUM('bre_barueri', 'usa_miami') NOT NULL DEFAULT 'bre_barueri',
    MODIFY `pass` VARCHAR(191) NULL;
