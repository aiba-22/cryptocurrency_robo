import type { Prisma, PrismaClient } from "@prisma/client";

export class GmoRepository {
  private prisma: PrismaClient | Prisma.TransactionClient;

  constructor(prismaClient: PrismaClient | Prisma.TransactionClient) {
    this.prisma = prismaClient;
  }

  async findByUserId(userId: number) {
    return await this.prisma.gmo.findFirst({
      where: { userId },
    });
  }

  async create(data: Prisma.GmoCreateInput) {
    return await this.prisma.gmo.create({
      data,
    });
  }

  async update(params: { id: number; data: Prisma.GmoUpdateInput }) {
    const { id, data } = params;
    return await this.prisma.gmo.update({
      where: { id },
      data,
    });
  }
}
