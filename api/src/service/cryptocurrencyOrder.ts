import axios from "axios";
import crypto from "crypto";
import db from "../db";

type Conditions = {
  symbol: string;
  targetPrice: number;
  quantity: number;
  orderType: number;
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
        orderType: cryptocurrencyOrder.order_type,
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
      orderType: number;
      isEnabled: number;
    }[]
  ) {
    const validationResult = this.validateConditions(conditions);
    if (!validationResult) {
      return "failure";
    }

    const transaction = await this.db.transaction();
    try {
      for (const {
        symbol,
        targetPrice,
        quantity,
        orderType,
        isEnabled,
      } of conditions) {
        await transaction("cryptocurrency_order").insert({
          symbol,
          target_price: targetPrice,
          quantity,
          order_type: orderType,
          isEnabled,
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
      orderType: number;
      isEnabled: number;
    }[]
  ) {
    const validationResult = this.validateConditions(conditions);
    if (!validationResult) {
      return "failure";
    }

    const transaction = await this.db.transaction();
    try {
      for (const {
        id,
        symbol,
        targetPrice,
        quantity,
        orderType,
        isEnabled,
      } of conditions) {
        await transaction("cryptocurrency_order").where({ id }).update({
          symbol,
          target_price: targetPrice,
          quantity: quantity,
          order_type: orderType,
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
  private validateConditions(conditions: Conditions[]): boolean {
    const sell = conditions.find((c) => c.orderType === 0);
    const buy = conditions.find((c) => c.orderType === 1);

    if (!sell || !buy) return false;
    return sell.targetPrice <= buy.targetPrice;
  }
}
