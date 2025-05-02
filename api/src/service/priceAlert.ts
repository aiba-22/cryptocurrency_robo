import db from "../db";

export default class PriceAlertService {
  db;
  constructor() {
    this.db = db;
  }

  async find() {
    const priceNotification = await this.db("price_alert")
      .where({ id: 1 }) //アカウント機能はつけない想定なのでid固定
      .first();

    return {
      id: priceNotification?.id || null,
      conditions: priceNotification?.conditions || null,
    };
  }

  async create(conditions: {
    price: number;
    isUpperLimit: boolean;
    symbol: string;
  }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("price_alert").insert({
        conditions,
        created_at: new Date(),
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
    conditions,
  }: {
    id: number;
    conditions: {
      price: number;
      isUpperLimit: boolean;
      symbol: string;
    };
  }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("price_alert")
        .where({ id })
        .update({
          conditions: JSON.stringify(conditions),
          updated_at: new Date(),
        });
      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }
}
