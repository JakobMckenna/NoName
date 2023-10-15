/*
  Warnings:

  - A unique constraint covering the columns `[projectID]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectID` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `GithubProject` DROP FOREIGN KEY `GithubProject_projectID_fkey`;

-- DropForeignKey
ALTER TABLE `ResearchNote` DROP FOREIGN KEY `ResearchNote_projectID_fkey`;

-- DropForeignKey
ALTER TABLE `UserPassword` DROP FOREIGN KEY `UserPassword_userID_fkey`;

-- DropForeignKey
ALTER TABLE `WebLink` DROP FOREIGN KEY `WebLink_noteID_fkey`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `projectID` VARCHAR(191) NOT NULL,
    ADD COLUMN `userID` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Task_projectID_key` ON `Task`(`projectID`);

-- AddForeignKey
ALTER TABLE `UserPassword` ADD CONSTRAINT `UserPassword_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GithubProject` ADD CONSTRAINT `GithubProject_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResearchNote` ADD CONSTRAINT `ResearchNote_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WebLink` ADD CONSTRAINT `WebLink_noteID_fkey` FOREIGN KEY (`noteID`) REFERENCES `ResearchNote`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
