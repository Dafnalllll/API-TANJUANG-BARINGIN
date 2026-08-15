-- CreateTable
CREATE TABLE `Pengaduan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `telepon` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `isi` VARCHAR(191) NOT NULL,
    `lampiran` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'menunggu',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
