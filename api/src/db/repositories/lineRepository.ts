import type { Prisma, PrismaClient } from "@prisma/client";

export class LineRepository {
  private prisma: PrismaClient | Prisma.TransactionClient;

  constructor(prismaClient: PrismaClient | Prisma.TransactionClient) {
    this.prisma = prismaClient;
  }

  async findByUserId(userId: number) {
    return await this.prisma.line.findFirst({
      where: { userId },
    });
  }

  async create(data: Prisma.LineCreateInput) {
    return await this.prisma.line.create({
      data,
    });
  }

  async update(params: { id: number; data: Prisma.LineUpdateInput }) {
    const { id, data } = params;
    return await this.prisma.line.update({
      where: { id },
      data,
    });
  }
}
