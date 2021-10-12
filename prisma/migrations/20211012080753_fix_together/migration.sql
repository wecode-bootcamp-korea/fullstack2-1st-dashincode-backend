/*
  Warnings:

  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,0)`.
  - You are about to alter the column `discounted_price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,0)`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `price` DECIMAL(6, 0) NOT NULL,
    MODIFY `discounted_price` DECIMAL(6, 0);
