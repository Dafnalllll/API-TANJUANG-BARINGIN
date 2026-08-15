/*
  Warnings:

  - Added the required column `name` to the `Faq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `faq` ADD COLUMN `file` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `pengaduan` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING';
