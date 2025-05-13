import db from "../db/db";
import { PriceAlertRepository } from "../db/repositories/priceAlertRepository";
import { ID } from "./constants";

export default class PriceAlertService {
  async find() {
    const priceAlertRepository = new PriceAlertRepository();

    const priceAlert = await priceAlertRepository.findById(ID);
    if (!priceAlert) return;

    return {
      id: priceAlert.id,
      conditions: priceAlert.conditions,
    };
  }

  async create(conditions: {
    price: number;
    isUpperLimit: boolean;
    symbol: string;
  }) {
    const transaction = await db.transaction();
    const priceAlertRepository = new PriceAlertRepository(transaction);
    try {
      await priceAlertRepository.create(conditions);
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
    const transaction = await db.transaction();
    const priceAlertRepository = new PriceAlertRepository(transaction);
    try {
      await priceAlertRepository.update({ id, conditions });
      await transaction.commit();
      return "success";
    } catch (error) {
      await transaction.rollback();
      return "failure";
    }
  }
}
