/*
  Warnings:

  - Added the required column `avatar_src` to the `guestbook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `guestbook` ADD COLUMN `avatar_src` VARCHAR(256) NOT NULL;
