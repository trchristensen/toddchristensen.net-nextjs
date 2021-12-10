/*
  Warnings:

  - You are about to drop the column `author` on the `comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `author`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `name` VARCHAR(128) NOT NULL DEFAULT '';
