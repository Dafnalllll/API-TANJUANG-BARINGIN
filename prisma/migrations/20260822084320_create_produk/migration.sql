/*
  Warnings:

  - You are about to drop the `pengaduan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `pengaduan`;

-- CreateTable
CREATE TABLE `Produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `badge` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `description` LONGTEXT NOT NULL,
    `highlights` JSON NULL,
    `cover` VARCHAR(191) NULL,
    `filePath` VARCHAR(191) NULL,
    `buttontext` VARCHAR(191) NULL DEFAULT 'Unduh File',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
