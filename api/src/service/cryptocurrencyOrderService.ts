import db from "../db/db";
import { CryptocurrencyOrderRepository } from "../db/repositories/cryptocurrencyOrderRepository";
import { USER_ID } from "./constants";

export default class CryptocurrencyOrderService {
  private db;
  constructor(dbInstance = db) {
    this.db = dbInstance;
  }

  async list() {
    const orderRepository = new CryptocurrencyOrderRepository();
    const orderList = await orderRepository.list(USER_ID);

    if (orderList.length === 0) return;

    const response = orderList.map((order) => {
      return {
        id: order.id,
        symbol: order.symbol,
        targetPrice: order.target_price,
        volume: order.volume,
        type: order.type,
        isEnabled: order.is_enabled,
      };
    });
    return response;
  }

  async create({
    symbol,
    targetPrice,
    volume,
    type,
    isEnabled,
  }: {
    symbol: string;
    targetPrice: number;
    volume: number;
    type: number;
    isEnabled: number;
  }) {
    const transaction = await this.db.transaction();
    const orderRepository = new CryptocurrencyOrderRepository(transaction);
    try {
      await orderRepository.create({
        userId: USER_ID,
        symbol,
        targetPrice,
        volume,
        type,
        isEnabled,
      });
      await transaction.commit();
      return "success";
    } catch (error) {
      console.error("Error creating order:", error);
      await transaction.rollback();
      return "systemError";
    }
  }

  async update({
    id,
    symbol,
    targetPrice,
    volume,
    type,
    isEnabled,
  }: {
    id: number;
    symbol: string;
    targetPrice: number;
    volume: number;
    type: number;
    isEnabled: number;
  }) {
    const transaction = await this.db.transaction();
    const orderRepository = new CryptocurrencyOrderRepository(transaction);
    try {
      await orderRepository.update({
        id,
        symbol,
        targetPrice,
        volume,
        type,
        isEnabled,
      });
      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "systemError";
    }
  }
}
