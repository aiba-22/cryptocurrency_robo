import type { Prisma, PrismaClient } from "@prisma/client";

export class CryptocurrencyPriceAlertRepository {
  private prisma: PrismaClient | Prisma.TransactionClient;

  constructor(prismaClient: PrismaClient | Prisma.TransactionClient) {
    this.prisma = prismaClient;
  }

  async findByUserId(userId: number) {
    return await this.prisma.cryptocurrencyPriceAlert.findFirst({
      where: { userId },
    });
  }

  async create(data: Prisma.CryptocurrencyPriceAlertCreateInput) {
    return await this.prisma.cryptocurrencyPriceAlert.create({
      data,
    });
  }

  async update(params: {
    id: number;
    data: Prisma.CryptocurrencyPriceAlertUpdateInput;
  }) {
    const { id, data } = params;
    return await this.prisma.cryptocurrencyPriceAlert.update({
      where: { id },
      data,
    });
  }
}
