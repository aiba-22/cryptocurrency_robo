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

  async create({
    userId,
    apiKey,
    secretKey,
  }: {
    userId: number;
    apiKey: string;
    secretKey: string;
  }) {
    return await this.prisma.gmo.create({
      data: {
        userId,
        apiKey,
        secretKey,
        createdAt: new Date(),
      },
    });
  }

  async update({
    id,
    apiKey,
    secretKey,
  }: {
    id: number;
    apiKey: string;
    secretKey: string;
  }) {
    return await this.prisma.gmo.update({
      where: { id },
      data: {
        apiKey,
        secretKey,
        updatedAt: new Date(),
      },
    });
  }
}
