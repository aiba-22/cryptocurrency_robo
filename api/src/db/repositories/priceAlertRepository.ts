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

  async create(data: Prisma.PriceAlertCreateInput) {
    await this.prisma.priceAlert.create({
      data,
    });
  }

  async update(params: { id: number; data: Prisma.PriceAlertUpdateInput }) {
    const { id, data } = params;
    await this.prisma.priceAlert.updateMany({
      where: { id },
      data,
    });
  }
}
