-- Drop the existing table if it exists
DROP TABLE IF EXISTS `CryptocurrencyAdjustmentOrder`;

-- Re-create the table from scratch
CREATE TABLE `CryptocurrencyAdjustmentOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `symbol` VARCHAR(20) NOT NULL,
    `basePrice` INTEGER NOT NULL,
    `isEnabled` TINYINT NOT NULL,
    `buyPriceAdjustmentRate` DECIMAL(3, 2) NOT NULL,
    `buyVolumeAdjustmentRate` DECIMAL(3, 2) NOT NULL,
    `sellPriceAdjustmentRate` DECIMAL(3, 2) NOT NULL,
    `sellVolumeAdjustmentRate` DECIMAL(3, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
