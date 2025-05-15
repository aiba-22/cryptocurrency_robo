import db from "../db/db";
import { CryptocurrencyOrderRepository } from "../db/repositories/cryptocurrencyOrderRepository";

export default class orderService {
  db;
  constructor() {
    this.db = db;
  }

  async list() {
    const orderRepository = new CryptocurrencyOrderRepository();
    const orderList = await orderRepository.list();

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
    const transaction = await db.transaction();
    const orderRepository = new CryptocurrencyOrderRepository(transaction);
    try {
      await orderRepository.create({
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
      return "failure";
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
    const transaction = await db.transaction();
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
      return "failure";
    }
  }
}
