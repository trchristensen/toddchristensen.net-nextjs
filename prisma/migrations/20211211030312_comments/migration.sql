-- CreateTable
CREATE TABLE `post` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `post_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commentOn` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `postType` ENUM('BLOG', 'PROJECT', 'COMMENT', 'BOOK', 'GUESTBOOKENTRY') NOT NULL,
    `slug` VARCHAR(256) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `commentId` BIGINT NOT NULL,
    `guestbookEntryId` BIGINT NULL,
    `bookId` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
