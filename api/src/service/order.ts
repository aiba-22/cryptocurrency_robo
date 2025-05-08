import axios from "axios";
import crypto from "crypto";
import db from "../db";
import { OrderRepository } from "../db/repositories/orderRepository";

export default class orderService {
  db;
  constructor() {
    this.db = db;
  }

  async list() {
    const orderRepository = new OrderRepository();
    const orderList = await orderRepository.list();
    const response = orderList.map((order) => {
      return {
        id: order.id,
        symbol: order.symbol,
        targetPrice: order.target_price,
        quantity: order.quantity,
        type: order.type,
        isEnabled: order.is_enabled,
      };
    });
    return response;
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
    const transaction = await db.transaction();
    const orderRepository = new OrderRepository(transaction);
    try {
      await orderRepository.create({
        symbol,
        targetPrice,
        quantity,
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
    const transaction = await db.transaction();
    const orderRepository = new OrderRepository(transaction);
    try {
      await orderRepository.update({
        id,
        symbol,
        targetPrice,
        quantity,
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
