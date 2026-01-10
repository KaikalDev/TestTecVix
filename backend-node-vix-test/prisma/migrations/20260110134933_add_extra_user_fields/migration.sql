-- AlterTable
ALTER TABLE `user` ADD COLUMN `contractDate` DATETIME(3) NULL,
    ADD COLUMN `department` VARCHAR(191) NULL,
    ADD COLUMN `field` VARCHAR(191) NULL,
    ADD COLUMN `fullName` VARCHAR(191) NULL,
    ADD COLUMN `userPhoneNumber` VARCHAR(191) NULL;
