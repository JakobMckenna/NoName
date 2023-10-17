/*
  Warnings:

  - You are about to drop the column `projectID` on the `ResearchNote` table. All the data in the column will be lost.
  - You are about to drop the column `projectID` on the `Task` table. All the data in the column will be lost.
  - Added the required column `sprintID` to the `ResearchNote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ResearchNote` DROP FOREIGN KEY `ResearchNote_projectID_fkey`;

-- DropIndex
DROP INDEX `Task_projectID_key` ON `Task`;

-- AlterTable
ALTER TABLE `ResearchNote` DROP COLUMN `projectID`,
    ADD COLUMN `sprintID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `projectID`;

-- AddForeignKey
ALTER TABLE `ResearchNote` ADD CONSTRAINT `ResearchNote_sprintID_fkey` FOREIGN KEY (`sprintID`) REFERENCES `Sprint`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
