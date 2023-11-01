/*
  Warnings:

  - You are about to drop the `_ProjectMemberToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ProjectMemberToUser` DROP FOREIGN KEY `_ProjectMemberToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProjectMemberToUser` DROP FOREIGN KEY `_ProjectMemberToUser_B_fkey`;

-- AlterTable
ALTER TABLE `ProjectMember` ADD COLUMN `userID` INTEGER NOT NULL DEFAULT 48;

-- DropTable
DROP TABLE `_ProjectMemberToUser`;

-- AddForeignKey
ALTER TABLE `ProjectMember` ADD CONSTRAINT `ProjectMember_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
