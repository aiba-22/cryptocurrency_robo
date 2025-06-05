import type { Prisma, PrismaClient } from "@prisma/client";

export class LineAccountRepository {
  private prisma: PrismaClient | Prisma.TransactionClient;

  constructor(prismaClient: PrismaClient | Prisma.TransactionClient) {
    this.prisma = prismaClient;
  }

  async findByUserId(userId: number) {
    return await this.prisma.lineAccount.findFirst({
      where: { userId },
    });
  }

  async create(data: Prisma.LineAccountCreateInput) {
    return await this.prisma.lineAccount.create({
      data,
    });
  }

  async update(params: { id: number; data: Prisma.LineAccountUpdateInput }) {
    const { id, data } = params;
    return await this.prisma.lineAccount.update({
      where: { id },
      data,
    });
  }
}
