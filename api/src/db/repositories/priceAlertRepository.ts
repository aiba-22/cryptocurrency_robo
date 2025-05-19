import db from "../db";

export class PriceAlertRepository {
  private db;

  constructor(dbInstance = db) {
    this.db = dbInstance;
  }

  async findById(id: number) {
    return await this.db("price_alert").where({ id }).first();
  }

  async create(conditions: {
    price: number;
    isUpperLimit: boolean;
    symbol: string;
  }) {
    await this.db("price_alert").insert({
      conditions,
    });
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
    await this.db("price_alert")
      .where({ id })
      .update({
        conditions: JSON.stringify(conditions),
        updated_at: new Date(),
      });
  }
}
