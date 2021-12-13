/*
  Warnings:

  - You are about to drop the column `commentOnId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the `commentOn` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `commentOnId`,
    ADD COLUMN `bookId` BIGINT NULL,
    ADD COLUMN `postId` BIGINT NULL;

-- DropTable
DROP TABLE `commentOn`;
