import prisma from "../db/prismaClient";
import { CryptocurrencyOrderRepository } from "../db/repositories/cryptocurrencyOrderRepository";
import { USER_ID } from "./constants";

export default class CryptocurrencyOrderService {
  async list() {
    const orderRepository = new CryptocurrencyOrderRepository(prisma);
    const orderList = await orderRepository.list(USER_ID);
    if (orderList.length === 0) return [];

    return orderList.map((order) => {
      const { id, symbol, targetPrice, volume, type, isEnabled } = order;
      return {
        id,
        symbol,
        targetPrice,
        volume,
        type,
        isEnabled,
      };
    });
  }

  async create(data: {
    symbol: string;
    targetPrice: number;
    volume: number;
    type: number;
    isEnabled: number;
  }) {
    try {
      const createdOrder = await prisma.$transaction(async (tx) => {
        const orderRepository = new CryptocurrencyOrderRepository(tx);
        return await orderRepository.create({
          userId: USER_ID,
          ...data,
        });
      });

      return { status: "success", order: createdOrder };
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
      const updatedOrder = await prisma.$transaction(async (tx) => {
        const orderRepository = new CryptocurrencyOrderRepository(tx);
        return await orderRepository.update({
          id: data.id,
          data,
        });
      });

      return { status: "success", order: updatedOrder };
    } catch (error) {
      console.error("Error updating order:", error);
      return { status: "systemError" };
    }
  }
}
