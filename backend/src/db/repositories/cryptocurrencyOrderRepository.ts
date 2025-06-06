import type { Prisma, PrismaClient } from "@prisma/client";

export class CryptocurrencyStaticOrderRepository {
  private prisma: PrismaClient | Prisma.TransactionClient;

  constructor(prismaClient: PrismaClient | Prisma.TransactionClient) {
    this.prisma = prismaClient;
  }

  async list(userId: number) {
    return await this.prisma.cryptocurrencyStaticOrder.findMany({
      where: { userId },
    });
  }

  async findByIdAndUserId(params: { id: number; userId: number }) {
    return await this.prisma.cryptocurrencyStaticOrder.findFirst({
      where: { id: params.id, userId: params.userId },
    });
  }

  async create(data: Prisma.CryptocurrencyStaticOrderCreateInput) {
    return await this.prisma.cryptocurrencyStaticOrder.create({
      data,
    });
  }

  async update(params: {
    id: number;
    data: Prisma.CryptocurrencyStaticOrderUpdateInput;
  }) {
    const { id, data } = params;
    return await this.prisma.cryptocurrencyStaticOrder.update({
      where: { id },
      data,
    });
  }
}
