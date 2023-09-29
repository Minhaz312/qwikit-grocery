/*
  Warnings:

  - You are about to alter the column `p_price` on the `ProductList` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "ProductList" ALTER COLUMN "p_price" SET DATA TYPE INTEGER;
