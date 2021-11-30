/*
  Warnings:

  - You are about to drop the column `comments` on the `books` table. All the data in the column will be lost.
  - Added the required column `comment` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `comments`,
    ADD COLUMN `comment` VARCHAR(500) NOT NULL,
    ADD COLUMN `subtitle` VARCHAR(256) NOT NULL,
    MODIFY `publish_date` VARCHAR(256) NOT NULL;
