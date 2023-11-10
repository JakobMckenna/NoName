/*
  Warnings:

  - You are about to drop the column `userID` on the `ProjectMember` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProjectMember` DROP FOREIGN KEY `ProjectMember_userID_fkey`;

-- AlterTable
ALTER TABLE `ProjectMember` DROP COLUMN `userID`;

-- CreateTable
CREATE TABLE `_ProjectMemberToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProjectMemberToUser_AB_unique`(`A`, `B`),
    INDEX `_ProjectMemberToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProjectMemberToUser` ADD CONSTRAINT `_ProjectMemberToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProjectMember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectMemberToUser` ADD CONSTRAINT `_ProjectMemberToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
