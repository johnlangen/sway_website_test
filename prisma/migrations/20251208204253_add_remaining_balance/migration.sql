-- DropIndex
DROP INDEX "BonusCard_giftCardId_key";

-- AlterTable
ALTER TABLE "BonusCard" ADD COLUMN     "remainingAmount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "GiftCard" ADD COLUMN     "remainingAmount" INTEGER NOT NULL DEFAULT 0;
