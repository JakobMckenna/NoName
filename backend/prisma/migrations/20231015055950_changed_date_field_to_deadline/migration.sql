/*
  Warnings:

  - You are about to drop the column `date` on the `Task` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `date`,
    ADD COLUMN `deadline` DATETIME(3) NOT NULL;
