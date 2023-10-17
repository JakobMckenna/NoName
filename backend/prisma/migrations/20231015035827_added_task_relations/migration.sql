/*
  Warnings:

  - You are about to drop the column `userID` on the `Task` table. All the data in the column will be lost.
  - Added the required column `assignedTo` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_userID_fkey`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `userID`,
    ADD COLUMN `assignedTo` INTEGER NOT NULL,
    ADD COLUMN `createdBy` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_assignedTo_fkey` FOREIGN KEY (`assignedTo`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
