import axios from "axios";
import crypto from "crypto";
import db from "../db";

export default class CryptocurrencyOrderService {
  db;
  constructor() {
    this.db = db;
  }

  async list() {
    try {
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
    } catch (error) {}
  }

  async create({
    symbol,
    targetPrice,
    quantity,
    orderType,
    isEnabled,
  }: {
    symbol: string;
    targetPrice: number;
    quantity: number;
    orderType: number;
    isEnabled: number;
  }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("cryptocurrency_order").insert({
        symbol,
        target_price: targetPrice,
        quantity: quantity,
        order_type: orderType,
        is_enabled: isEnabled,
        updated_at: new Date(),
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
    quantity,
    orderType,
    isEnabled,
  }: {
    id: number;
    symbol: string;
    targetPrice: number;
    quantity: number;
    orderType: number;
    isEnabled: number;
  }) {
    const transaction = await this.db.transaction();
    try {
      await transaction("cryptocurrency_order").where({ id }).update({
        symbol,
        target_price: targetPrice,
        quantity: quantity,
        order_type: orderType,
        is_enabled: isEnabled,
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
