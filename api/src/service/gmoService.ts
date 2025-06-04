import { PrismaClient } from "@prisma/client";
import { GmoRepository } from "../db/repositories/gmoRepository";
import { USER_ID } from "./constants";

export default class GmoService {
  private prisma: PrismaClient;

  constructor(prismaClient = new PrismaClient()) {
    this.prisma = prismaClient;
  }

  async find() {
    const gmoRepository = new GmoRepository(this.prisma);
    const gmo = await gmoRepository.findByUserId(USER_ID);
    if (!gmo) return;
    const { id, apiKey, secretKey } = gmo;
    return {
      id,
      apiKey,
      secretKey,
    };
  }

  async create({ apiKey, secretKey }: { apiKey: string; secretKey: string }) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const gmoRepository = new GmoRepository(tx);
        await gmoRepository.create({
          userId: USER_ID,
          apiKey,
          secretKey,
        });
      });
      return "success";
    } catch (error) {
      console.error("GMO create error:", error);
      return "systemError";
    }
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
    try {
      await this.prisma.$transaction(async (tx) => {
        const gmoRepository = new GmoRepository(tx);
        await gmoRepository.update({ id, data: { apiKey, secretKey } });
      });
      return "success";
    } catch (error) {
      console.error("GMO update error:", error);
      return "systemError";
    }
  }
}
