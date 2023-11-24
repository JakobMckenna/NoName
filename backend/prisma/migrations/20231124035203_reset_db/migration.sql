-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPassword` (
    `userID` INTEGER NOT NULL,
    `password` VARCHAR(191) NULL,

    INDEX `UserPassword_userID_idx`(`userID`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Project_userId_idx`(`userId`),
    UNIQUE INDEX `Project_name_userId_key`(`name`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sprint` (
    `id` VARCHAR(191) NOT NULL,
    `projectID` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `start` DATETIME(3) NULL,
    `deadline` DATETIME(3) NOT NULL,

    INDEX `Sprint_projectID_idx`(`projectID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectMember` (
    `id` VARCHAR(191) NOT NULL,
    `projectID` VARCHAR(191) NOT NULL,

    INDEX `ProjectMember_projectID_idx`(`projectID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GithubProject` (
    `id` VARCHAR(191) NOT NULL,
    `owner` VARCHAR(191) NOT NULL,
    `repoName` VARCHAR(191) NOT NULL,
    `projectID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GithubProject_projectID_key`(`projectID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NULL,
    `deadline` DATETIME(3) NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `assignedTo` INTEGER NOT NULL,
    `completed` BOOLEAN NOT NULL,
    `sprintID` VARCHAR(191) NOT NULL,

    INDEX `Task_sprintID_idx`(`sprintID`),
    INDEX `Task_createdBy_idx`(`createdBy`),
    INDEX `Task_assignedTo_idx`(`assignedTo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResearchNote` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NOT NULL,
    `userID` INTEGER NOT NULL,
    `sprintID` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastModified` DATETIME(3) NOT NULL,

    INDEX `ResearchNote_userID_idx`(`userID`),
    INDEX `ResearchNote_sprintID_idx`(`sprintID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WebLink` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NULL,
    `noteID` VARCHAR(191) NOT NULL,

    INDEX `WebLink_noteID_idx`(`noteID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `userID` INTEGER NOT NULL,
    `projectID` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Chat_projectID_idx`(`projectID`),
    INDEX `Chat_userID_idx`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectMemberToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProjectMemberToUser_AB_unique`(`A`, `B`),
    INDEX `_ProjectMemberToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
