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

  async create({
    userId,
    channelAccessToken,
    lineUserId,
  }: {
    channelAccessToken: string;
    userId: number;
    lineUserId: string;
  }) {
    await this.prisma.line.create({
      data: {
        userId,
        channelAccessToken,
        lineUserId,
        createdAt: new Date(),
      },
    });
  }

  async update({
    id,
    channelAccessToken,
    lineUserId,
  }: {
    id: number;
    channelAccessToken: string;
    lineUserId: string;
  }) {
    await this.prisma.line.update({
      where: { id },
      data: {
        channelAccessToken,
        lineUserId,
        updatedAt: new Date(),
      },
    });
  }
}
