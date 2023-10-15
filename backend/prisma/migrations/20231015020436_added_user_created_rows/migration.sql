/*
  Warnings:

  - You are about to drop the `_ProjectToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ProjectToUser` DROP FOREIGN KEY `_ProjectToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProjectToUser` DROP FOREIGN KEY `_ProjectToUser_B_fkey`;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_ProjectToUser`;

-- CreateTable
CREATE TABLE `ProjectMember` (
    `id` VARCHAR(191) NOT NULL,
    `projectID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectMemberToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProjectMemberToUser_AB_unique`(`A`, `B`),
    INDEX `_ProjectMemberToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectMember` ADD CONSTRAINT `ProjectMember_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectMemberToUser` ADD CONSTRAINT `_ProjectMemberToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProjectMember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectMemberToUser` ADD CONSTRAINT `_ProjectMemberToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
