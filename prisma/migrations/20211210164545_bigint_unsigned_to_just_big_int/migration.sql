/*
  Warnings:

  - You are about to alter the column `authorId` on the `book` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `BigInt`.
  - You are about to alter the column `authorId` on the `comment` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `BigInt`.
  - You are about to alter the column `authorId` on the `guestbookEntry` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `authorId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `comment` MODIFY `authorId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `guestbookEntry` MODIFY `authorId` BIGINT NOT NULL;
