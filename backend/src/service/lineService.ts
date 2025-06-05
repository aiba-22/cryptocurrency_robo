import { PrismaClient } from "@prisma/client";
import { LineAccountRepository } from "../db/repositories/lineAccountRepository";
import { USER_ID } from "./constants";

const prisma = new PrismaClient();

export default class LineService {
  private prisma: PrismaClient;

  constructor(prismaClient = prisma) {
    this.prisma = prismaClient;
  }

  async find() {
    const lineAccountRepository = new LineAccountRepository(this.prisma);
    const line = await lineAccountRepository.findByUserId(USER_ID);
    if (!line) return;
    const { id, channelAccessToken, lineUserId } = line;
    return {
      id,
      channelAccessToken,
      lineUserId,
    };
  }

  async create({
    channelAccessToken,
    lineUserId,
  }: {
    channelAccessToken: string;
    lineUserId: string;
  }) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const lineAccountRepository = new LineAccountRepository(tx);
        await lineAccountRepository.create({
          userId: USER_ID,
          channelAccessToken,
          lineUserId,
        });
      });
      return { status: "success" };
    } catch (error) {
      console.error("Error creating Line:", error);
      return { status: "systemError" };
    }
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
    try {
      await this.prisma.$transaction(async (tx) => {
        const lineRepository = new LineAccountRepository(tx);
        await lineRepository.update({
          id,
          data: { channelAccessToken, lineUserId },
        });
      });
      return { status: "success" };
    } catch (error) {
      console.error("Error updating Line:", error);
      return { status: "systemError" };
    }
  }
}
