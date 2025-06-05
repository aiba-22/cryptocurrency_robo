import type { Prisma, PrismaClient } from "@prisma/client";

export class GmoAccountRepository {
  private prisma: PrismaClient | Prisma.TransactionClient;

  constructor(prismaClient: PrismaClient | Prisma.TransactionClient) {
    this.prisma = prismaClient;
  }

  async findByUserId(userId: number) {
    return await this.prisma.gmoAccount.findFirst({
      where: { userId },
    });
  }

  async create(data: Prisma.GmoAccountCreateInput) {
    return await this.prisma.gmoAccount.create({
      data,
    });
  }

  async update(params: { id: number; data: Prisma.GmoAccountUpdateInput }) {
    const { id, data } = params;
    return await this.prisma.gmoAccount.update({
      where: { id },
      data,
    });
  }
}
