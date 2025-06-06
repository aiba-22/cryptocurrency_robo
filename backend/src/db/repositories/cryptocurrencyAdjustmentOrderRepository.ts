import type { Prisma, PrismaClient } from "@prisma/client";

export class CryptocurrencyAdjustmentOrderRepository {
  private prisma: PrismaClient | Prisma.TransactionClient;

  constructor(prismaClient: PrismaClient | Prisma.TransactionClient) {
    this.prisma = prismaClient;
  }

  async findByIdAndUserId(params: { id: number; userId: number }) {
    return await this.prisma.cryptocurrencyAdjustmentOrder.findFirst({
      where: { id: params.id, userId: params.userId },
    });
  }

  async create(data: Prisma.CryptocurrencyAdjustmentOrderCreateInput) {
    return await this.prisma.cryptocurrencyAdjustmentOrder.create({
      data,
    });
  }

  async update(params: {
    id: number;
    data: Prisma.CryptocurrencyAdjustmentOrderUpdateInput;
  }) {
    const { id, data } = params;
    return await this.prisma.cryptocurrencyAdjustmentOrder.update({
      where: { id },
      data,
    });
  }
}
