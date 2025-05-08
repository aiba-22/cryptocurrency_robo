import axios from "axios";
import crypto from "crypto";
import db from "../db";

type Conditions = {
  symbol: string;
  targetPrice: number;
  quantity: number;
  type: number;
  isEnabled: number;
};

export default class CryptocurrencyOrderService {
  db;
  constructor() {
    this.db = db;
  }

  async list() {
    const cryptocurrencyOrderList = await this.db("cryptocurrency_order");
    const response = cryptocurrencyOrderList.map((cryptocurrencyOrder) => {
      return {
        id: cryptocurrencyOrder.id,
        symbol: cryptocurrencyOrder.symbol,
        targetPrice: cryptocurrencyOrder.target_price,
        quantity: cryptocurrencyOrder.quantity,
        type: cryptocurrencyOrder.type,
        isEnabled: cryptocurrencyOrder.is_enabled,
      };
    });
    return response;
  }

  async create(
    conditions: {
      symbol: string;
      targetPrice: number;
      quantity: number;
      type: number;
      isEnabled: number;
    }[]
  ) {
    const transaction = await this.db.transaction();
    try {
      for (const {
        symbol,
        targetPrice,
        quantity,
        type,
        isEnabled,
      } of conditions) {
        await transaction("cryptocurrency_order").insert({
          symbol,
          target_price: targetPrice,
          quantity,
          type: type,
          is_enabled: isEnabled,
          updated_at: new Date(),
        });
      }

      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }

  async update(
    conditions: {
      id: number;
      symbol: string;
      targetPrice: number;
      quantity: number;
      type: number;
      isEnabled: number;
    }[]
  ) {
    const transaction = await this.db.transaction();
    try {
      for (const {
        id,
        symbol,
        targetPrice,
        quantity,
        type,
        isEnabled,
      } of conditions) {
        await transaction("cryptocurrency_order").where({ id }).update({
          symbol,
          target_price: targetPrice,
          quantity: quantity,
          type: type,
          is_enabled: isEnabled,
          updated_at: new Date(),
        });
      }
      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }
}
