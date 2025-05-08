// repositories/orderRepository.ts
import db from "../db";

export class OrderRepository {
  private db;

  constructor(dbInstance = db) {
    this.db = dbInstance;
  }

  async list() {
    return this.db("order");
  }

  async create({
    symbol,
    targetPrice,
    quantity,
    type,
    isEnabled,
  }: {
    symbol: string;
    targetPrice: number;
    quantity: number;
    type: number;
    isEnabled: number;
  }) {
    return this.db("order").insert({
      symbol,
      target_price: targetPrice,
      quantity: quantity,
      type: type,
      is_enabled: isEnabled,
      updated_at: new Date(),
    });
  }

  async update({
    id,
    symbol,
    targetPrice,
    quantity,
    type,
    isEnabled,
  }: {
    id: number;
    symbol: string;
    targetPrice: number;
    quantity: number;
    type: number;
    isEnabled: number;
  }) {
    return this.db("order").where({ id }).update({
      symbol,
      target_price: targetPrice,
      quantity: quantity,
      type: type,
      is_enabled: isEnabled,
      updated_at: new Date(),
    });
  }
}
