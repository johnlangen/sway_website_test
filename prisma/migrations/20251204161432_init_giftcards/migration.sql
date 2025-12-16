-- CreateTable
CREATE TABLE "GiftCard" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "design" TEXT,
    "sendOption" TEXT NOT NULL,
    "recipientName" TEXT,
    "recipientEmail" TEXT,
    "title" TEXT,
    "message" TEXT,
    "scheduled" BOOLEAN NOT NULL DEFAULT false,
    "deliveryDate" TIMESTAMP(3),
    "redeemed" BOOLEAN NOT NULL DEFAULT false,
    "redeemedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sessionId" TEXT NOT NULL,
    "paymentIntent" TEXT,

    CONSTRAINT "GiftCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BonusCard" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 25,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "redeemed" BOOLEAN NOT NULL DEFAULT false,
    "redeemedAt" TIMESTAMP(3),
    "giftCardId" TEXT NOT NULL,

    CONSTRAINT "BonusCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GiftCard_code_key" ON "GiftCard"("code");

-- CreateIndex
CREATE UNIQUE INDEX "GiftCard_sessionId_key" ON "GiftCard"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "BonusCard_code_key" ON "BonusCard"("code");

-- CreateIndex
CREATE UNIQUE INDEX "BonusCard_giftCardId_key" ON "BonusCard"("giftCardId");

-- AddForeignKey
ALTER TABLE "BonusCard" ADD CONSTRAINT "BonusCard_giftCardId_fkey" FOREIGN KEY ("giftCardId") REFERENCES "GiftCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
