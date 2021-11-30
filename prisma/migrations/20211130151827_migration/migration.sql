-- AlterTable
ALTER TABLE `books` MODIFY `description` VARCHAR(500) NULL,
    MODIFY `rating` FLOAT NULL,
    MODIFY `cover_src` VARCHAR(256) NULL,
    MODIFY `key` VARCHAR(256) NULL,
    MODIFY `num_pages` INTEGER NULL,
    MODIFY `publish_date` VARCHAR(256) NULL,
    MODIFY `subjects` VARCHAR(256) NULL,
    MODIFY `comment` VARCHAR(500) NULL,
    MODIFY `subtitle` VARCHAR(256) NULL;
