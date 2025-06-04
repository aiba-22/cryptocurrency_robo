import type { Prisma, PrismaClient } from "@prisma/client";

export class PriceAlertRepository {
  private prisma: PrismaClient | Prisma.TransactionClient;

  constructor(prismaClient: PrismaClient | Prisma.TransactionClient) {
    this.prisma = prismaClient;
  }

  async findByUserId(userId: number) {
    return await this.prisma.priceAlert.findFirst({
      where: { userId },
    });
  }

  async create({
    userId,
    conditions,
  }: {
    userId: number;
    conditions: {
      price: number;
      isUpperLimit: boolean;
      symbol: string;
    };
  }) {
    await this.prisma.priceAlert.create({
      data: {
        userId,
        conditions, // JSON型として保存される前提
        createdAt: new Date(),
      },
    });
  }

  async update({
    id,
    conditions,
  }: {
    id: number;
    conditions: {
      price: number;
      isUpperLimit: boolean;
      symbol: string;
    };
  }) {
    await this.prisma.priceAlert.update({
      where: { id },
      data: {
        conditions,
        updatedAt: new Date(),
      },
    });
  }
}
