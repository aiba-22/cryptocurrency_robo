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

  async findByIdAndUserId(params: { id: number; userId: number }) {
    return await this.prisma.cryptocurrencyOrder.findFirst({
      where: { id: params.id, userId: params.userId },
    });
  }

  async create(data: Prisma.CryptocurrencyOrderCreateInput) {
    return await this.prisma.cryptocurrencyOrder.create({
      data,
    });
  }

  async update(params: {
    id: number;
    data: Prisma.CryptocurrencyOrderUpdateInput;
  }) {
    const { id, data } = params;
    return await this.prisma.cryptocurrencyOrder.update({
      where: { id },
      data,
    });
  }
}
