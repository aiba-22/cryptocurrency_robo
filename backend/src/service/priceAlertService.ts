import { PrismaClient } from "@prisma/client";
import { CryptocurrencyPriceAlertRepository } from "../db/repositories/cryptocurrencyPriceAlertRepository";
import { USER_ID } from "./constants";

const prisma = new PrismaClient();

export default class PriceAlertService {
  private prisma: PrismaClient;

  constructor(prismaClient = prisma) {
    this.prisma = prismaClient;
  }

  async find() {
    const cryptocurrencyPriceAlertRepository =
      new CryptocurrencyPriceAlertRepository(this.prisma);
    const priceAlert = await cryptocurrencyPriceAlertRepository.findByUserId(
      USER_ID
    );
    if (!priceAlert) return;
    const { id, conditions } = priceAlert;

    return {
      id,
      conditions,
    };
  }

  async create(conditions: {
    price: number;
    isUpperLimit: boolean;
    symbol: string;
  }) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const cryptocurrencyPriceAlertRepository =
          new CryptocurrencyPriceAlertRepository(tx);
        await cryptocurrencyPriceAlertRepository.create({
          conditions,
          userId: USER_ID,
        });
      });
      return { status: "success" };
    } catch (error) {
      console.error("Error creating PriceAlert:", error);
      return { status: "systemError" };
    }
  }

  async update({
    id,
    conditions,
  }: {
    id: number;
    conditions: {
      price: number;
      isUpperLimit: boolean;
      symbol: string;
    };
  }) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const cryptocurrencyPriceAlertRepository =
          new CryptocurrencyPriceAlertRepository(tx);
        await cryptocurrencyPriceAlertRepository.update({
          id,
          data: { conditions },
        });
      });
      return { status: "success" };
    } catch (error) {
      console.error("Error updating PriceAlert:", error);
      return { status: "systemError" };
    }
  }
}
