-- AlterTable
ALTER TABLE `books` ADD COLUMN `read_status` ENUM('HAS_READ', 'HAS_NOT_READ', 'READING') NOT NULL DEFAULT 'HAS_NOT_READ';