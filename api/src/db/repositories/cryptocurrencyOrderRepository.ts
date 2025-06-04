import type { Prisma, PrismaClient } from "@prisma/client";

export class CryptocurrencyOrderRepository {
  private prisma: PrismaClient | Prisma.TransactionClient;

  constructor(prismaClient: PrismaClient | Prisma.TransactionClient) {
    this.prisma = prismaClient;
  }

  async list(userId: number) {
    return await this.prisma.cryptocurrencyOrder.findMany({
      where: { userId },
    });
  }

  async findByIdAndUserId({ id, userId }: { id: number; userId: number }) {
    return await this.prisma.cryptocurrencyOrder.findFirst({
      where: { id, userId },
    });
  }

  async create({
    userId,
    symbol,
    targetPrice,
    volume,
    type,
    isEnabled,
  }: {
    userId: number;
    symbol: string;
    targetPrice: number;
    volume: number;
    type: number;
    isEnabled: number;
  }) {
    return await this.prisma.cryptocurrencyOrder.create({
      data: {
        userId,
        symbol,
        targetPrice,
        volume,
        type,
        isEnabled,
      },
    });
  }

  async update({
    id,
    symbol,
    targetPrice,
    volume,
    type,
    isEnabled,
  }: {
    id: number;
    symbol: string;
    targetPrice: number;
    volume: number;
    type: number;
    isEnabled: number; // booleanならbooleanに変更推奨
  }) {
    return await this.prisma.cryptocurrencyOrder.update({
      where: { id },
      data: {
        symbol,
        targetPrice,
        volume,
        type,
        isEnabled,
        updatedAt: new Date(),
      },
    });
  }
}
