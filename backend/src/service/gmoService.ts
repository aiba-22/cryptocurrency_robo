import prisma from "../db/prismaClient";
import { PrismaClient } from "@prisma/client";
import { GmoAccountRepository } from "../db/repositories/gmoAccountRepository";
import { USER_ID } from "./constants";

export default class GmoService {
  private prisma: PrismaClient;

  constructor(prismaClient = prisma) {
    this.prisma = prismaClient;
  }

  async find() {
    const gmoAccountRepository = new GmoAccountRepository(this.prisma);
    const gmo = await gmoAccountRepository.findByUserId(USER_ID);
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
        const gmoAccountRepository = new GmoAccountRepository(tx);
        await gmoAccountRepository.create({
          userId: USER_ID,
          apiKey,
          secretKey,
        });
      });
      return { status: "success" };
    } catch (error) {
      console.error("GMO create error:", error);
      return { status: "systemError" };
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
        const gmoAccountRepository = new GmoAccountRepository(tx);
        await gmoAccountRepository.update({ id, data: { apiKey, secretKey } });
      });
      return { status: "success" };
    } catch (error) {
      console.error("GMO update error:", error);
      return { status: "systemError" };
    }
  }
}
