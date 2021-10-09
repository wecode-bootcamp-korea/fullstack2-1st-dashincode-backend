/*
  Warnings:

  - You are about to drop the column `review_content` on the `comments` table. All the data in the column will be lost.
  - Added the required column `comment` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `review_content`,
    ADD COLUMN `comment` VARCHAR(1000) NOT NULL;
