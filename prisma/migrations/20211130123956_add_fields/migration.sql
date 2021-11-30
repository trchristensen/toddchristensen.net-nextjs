/*
  Warnings:

  - Added the required column `comments` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_src` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `num_pages` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publish_date` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjects` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `comments` VARCHAR(500) NOT NULL,
    ADD COLUMN `cover_src` VARCHAR(256) NOT NULL,
    ADD COLUMN `key` VARCHAR(256) NOT NULL,
    ADD COLUMN `num_pages` INTEGER NOT NULL,
    ADD COLUMN `publish_date` DATETIME(6) NOT NULL,
    ADD COLUMN `subjects` VARCHAR(256) NOT NULL;
