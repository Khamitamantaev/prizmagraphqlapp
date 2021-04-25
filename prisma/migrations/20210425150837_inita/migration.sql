/*
  Warnings:

  - You are about to drop the `link` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `link`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `profession` VARCHAR(191) NOT NULL,
    `onvacation` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
