/*
  Warnings:

  - Added the required column `userID` to the `ResearchNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ResearchNote` ADD COLUMN `userID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ResearchNote` ADD CONSTRAINT `ResearchNote_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
