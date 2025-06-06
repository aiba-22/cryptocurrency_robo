import { PrismaClient } from "@prisma/client";
import prisma from "../db/prismaClient";
import { USER_ID } from "./constants";
import { CryptocurrencyStaticOrderRepository } from "../db/repositories/cryptocurrencyOrderRepository";

export default class CryptocurrencyStaticOrderService {
  private prisma: PrismaClient;

  constructor(prismaClient = prisma) {
    this.prisma = prismaClient;
  }
  async list() {
    const orderRepository = new CryptocurrencyStaticOrderRepository(
      this.prisma
    );
    const orderList = await orderRepository.list(USER_ID);
    if (orderList.length === 0) return [];

    return orderList.map(
      (order: {
        id: number;
        symbol: string;
        targetPrice: number;
        volume: number;
        type: number;
        isEnabled: number;
      }) => {
        const { id, symbol, targetPrice, volume, type, isEnabled } = order;
        return {
          id,
          symbol,
          targetPrice,
          volume,
          type,
          isEnabled,
        };
      }
    );
  }

  async create(data: {
    symbol: string;
    targetPrice: number;
    volume: number;
    type: number;
    isEnabled: number;
  }) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const orderRepository = new CryptocurrencyStaticOrderRepository(tx);
        return await orderRepository.create({
          userId: USER_ID,
          ...data,
        });
      });

      return { status: "success" };
    } catch (error) {
      console.error("Error creating order:", error);
      return { status: "systemError" };
    }
  }

  async update(data: {
    id: number;
    symbol: string;
    targetPrice: number;
    volume: number;
    type: number;
    isEnabled: number;
  }) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const orderRepository = new CryptocurrencyStaticOrderRepository(tx);
        return await orderRepository.update({
          id: data.id,
          data,
        });
      });

      return { status: "success" };
    } catch (error) {
      console.error("Error updating order:", error);
      return { status: "systemError" };
    }
  }
}
