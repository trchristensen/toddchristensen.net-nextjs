/*
  Warnings:

  - You are about to drop the column `postType` on the `commentOn` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `commentOn` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `commentOn` DROP COLUMN `postType`,
    DROP COLUMN `slug`,
    ADD COLUMN `postId` BIGINT NULL;
