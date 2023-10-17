/*
  Warnings:

  - Added the required column `completed` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sprintID` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_assignedTo_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_projectID_fkey`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `completed` BOOLEAN NOT NULL,
    ADD COLUMN `sprintID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_sprintID_fkey` FOREIGN KEY (`sprintID`) REFERENCES `Sprint`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_assignedTo_fkey` FOREIGN KEY (`assignedTo`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
