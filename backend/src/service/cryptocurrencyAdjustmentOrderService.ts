import { PrismaClient } from "@prisma/client";
import prisma from "../db/prismaClient";
import { USER_ID } from "./constants";
import { CryptocurrencyAdjustmentOrderRepository } from "../db/repositories/cryptocurrencyAdjustmentOrderRepository";

export default class CryptocurrencyAdjustmentOrderService {
  private prisma: PrismaClient;

  constructor(prismaClient = prisma) {
    this.prisma = prismaClient;
  }
  async find() {
    const orderRepository = new CryptocurrencyAdjustmentOrderRepository(
      this.prisma
    );
    const order = await orderRepository.findByIdAndUserId({
      id: USER_ID,
      userId: USER_ID,
    });
    if (!order) return;
    const {
      id,
      symbol,
      basePrice,
      isEnabled,
      buyPriceAdjustmentRate,
      buyVolumeAdjustmentRate,
      sellPriceAdjustmentRate,
      sellVolumeAdjustmentRate,
    } = order;
    return {
      id,
      symbol,
      basePrice,
      isEnabled,
      buyPriceAdjustmentRate: Number(buyPriceAdjustmentRate),
      buyVolumeAdjustmentRate: Number(buyVolumeAdjustmentRate),
      sellPriceAdjustmentRate: Number(sellPriceAdjustmentRate),
      sellVolumeAdjustmentRate: Number(sellVolumeAdjustmentRate),
    };
  }

  async create(data: {
    symbol: string;
    basePrice: number;
    isEnabled: number;
    buyPriceAdjustmentRate: number;
    buyVolumeAdjustmentRate: number;
    sellPriceAdjustmentRate: number;
    sellVolumeAdjustmentRate: number;
  }) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const orderRepository = new CryptocurrencyAdjustmentOrderRepository(tx);
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
    symbol?: string;
    basePrice?: number;
    isEnabled?: number;
    buyPriceAdjustmentRate?: number;
    buyVolumeAdjustmentRate?: number;
    sellPriceAdjustmentRate?: number;
    sellVolumeAdjustmentRate?: number;
  }) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const orderRepository = new CryptocurrencyAdjustmentOrderRepository(tx);
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
