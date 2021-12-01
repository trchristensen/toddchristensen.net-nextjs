/*
  Warnings:

  - You are about to alter the column `publish_date` on the `books` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(128)`.

*/
-- AlterTable
ALTER TABLE `books` MODIFY `description` VARCHAR(1000) NULL,
    MODIFY `publish_date` VARCHAR(128) NULL,
    MODIFY `subjects` VARCHAR(2000) NULL,
    MODIFY `comment` VARCHAR(1000) NULL;
