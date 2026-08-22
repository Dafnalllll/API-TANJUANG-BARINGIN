/*
  Warnings:

  - You are about to drop the column `buttontext` on the `produk` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `produk` DROP COLUMN `buttontext`,
    ADD COLUMN `buttonText` VARCHAR(191) NULL DEFAULT 'Unduh File';
