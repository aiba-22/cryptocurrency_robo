// repositories/orderRepository.ts
import db from "../db";

export class CryptocurrencyOrderRepository {
  private db;

  constructor(dbInstance = db) {
    this.db = dbInstance;
  }

  async list() {
    return await this.db("cryptocurrency_order");
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
    await this.db("cryptocurrency_order").insert({
      symbol,
      target_price: targetPrice,
      volume: volume,
      type: type,
      is_enabled: isEnabled,
    });
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
    await this.db("cryptocurrency_order").where({ id }).update({
      symbol,
      target_price: targetPrice,
      volume: volume,
      type: type,
      is_enabled: isEnabled,
      updated_at: new Date(),
    });
  }
}
