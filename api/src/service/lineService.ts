import { PrismaClient } from "@prisma/client";
import { LineRepository } from "../db/repositories/lineRepository";
import { USER_ID } from "./constants";

const prisma = new PrismaClient();

export default class LineService {
  private prisma: PrismaClient;

  constructor(prismaClient = prisma) {
    this.prisma = prismaClient;
  }

  async find() {
    const repository = new LineRepository(this.prisma);
    const line = await repository.findByUserId(USER_ID);
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
      const created = await this.prisma.$transaction(async (tx) => {
        const lineRepository = new LineRepository(tx);
        await lineRepository.create({
          userId: USER_ID,
          channelAccessToken,
          lineUserId,
        });
      });
      return "success";
    } catch (error) {
      console.error("Error creating Line:", error);
      return "systemError";
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
      const updated = await this.prisma.$transaction(async (tx) => {
        const lineRepository = new LineRepository(tx);
        await lineRepository.update({ id, channelAccessToken, lineUserId });
      });
      return "success";
    } catch (error) {
      console.error("Error updating Line:", error);
      return "systemError";
    }
  }
}
