/*
  Warnings:

  - Added the required column `created_by` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `created_by` VARCHAR(256) NOT NULL;
