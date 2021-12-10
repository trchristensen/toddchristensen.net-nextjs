-- CreateTable
CREATE TABLE `guestbookEntry` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `authorId` BIGINT UNSIGNED NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `body` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `view` (
    `slug` VARCHAR(128) NOT NULL,
    `count` BIGINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(256) NOT NULL,
    `subtitle` VARCHAR(256) NULL,
    `author` VARCHAR(256) NOT NULL,
    `description` TEXT NULL,
    `publishDate` VARCHAR(128) NULL,
    `numPages` INTEGER NULL,
    `cover` VARCHAR(256) NULL,
    `subjects` TEXT NULL,
    `key` VARCHAR(256) NULL,
    `comment` TEXT NULL,
    `rating` FLOAT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `authorId` BIGINT UNSIGNED NOT NULL,
    `readStatus` ENUM('HAS_READ', 'HAS_NOT_READ', 'READING') NOT NULL DEFAULT 'HAS_NOT_READ',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `author` VARCHAR(256) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `body` TEXT NOT NULL,
    `authorId` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(256) NOT NULL,
    `avatar` VARCHAR(256) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
