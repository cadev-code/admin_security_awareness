-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Module` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `type` ENUM('IMAGE', 'VIDEO', 'AUDIO') NOT NULL DEFAULT 'VIDEO',
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bgColor` VARCHAR(191) NOT NULL,
    `bgImage` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Module_title_key`(`title`),
    UNIQUE INDEX `Module_url_key`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Audio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `availability` DATETIME(3) NOT NULL,
    `examUrl` VARCHAR(191) NOT NULL,
    `idModule` INTEGER NOT NULL,

    UNIQUE INDEX `Audio_title_key`(`title`),
    UNIQUE INDEX `Audio_filename_key`(`filename`),
    UNIQUE INDEX `Audio_examUrl_key`(`examUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `cover` VARCHAR(191) NOT NULL,
    `availability` DATETIME(3) NOT NULL,
    `examUrl` VARCHAR(191) NOT NULL,
    `idModule` INTEGER NOT NULL,

    UNIQUE INDEX `Video_title_key`(`title`),
    UNIQUE INDEX `Video_filename_key`(`filename`),
    UNIQUE INDEX `Video_cover_key`(`cover`),
    UNIQUE INDEX `Video_examUrl_key`(`examUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `cover` VARCHAR(191) NOT NULL,
    `availability` DATETIME(3) NOT NULL,
    `examUrl` VARCHAR(191) NOT NULL,
    `idModule` INTEGER NOT NULL,

    UNIQUE INDEX `Image_title_key`(`title`),
    UNIQUE INDEX `Image_filename_key`(`filename`),
    UNIQUE INDEX `Image_cover_key`(`cover`),
    UNIQUE INDEX `Image_examUrl_key`(`examUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Audio` ADD CONSTRAINT `Audio_idModule_fkey` FOREIGN KEY (`idModule`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_idModule_fkey` FOREIGN KEY (`idModule`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_idModule_fkey` FOREIGN KEY (`idModule`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
