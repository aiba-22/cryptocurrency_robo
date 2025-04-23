import { Request, Response } from "express";
import PriceAlertService from "../service/priceAlert";
import {
  createPriceAlertSchema,
  updatePriceAlertSchema,
} from "../schema/priceAlertSchema";

export const get = async (req: Request, res: Response) => {
  const priceAlertService = new PriceAlertService();
  const id = 1; //現状複数登録機能がついてないため、一つ目のIDを指定する
  const result = await priceAlertService.find(id);
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const priceAlertService = new PriceAlertService();
  const { conditions } = createPriceAlertSchema.parse(req.body);
  const result = await priceAlertService.create(conditions);
  res.status(200).json(result);
};

export const update = async (req: Request, res: Response) => {
  const priceAlertService = new PriceAlertService();
  const { id, conditions } = updatePriceAlertSchema.parse(req.body);
  const result = await priceAlertService.update({
    id,
    conditions,
  });
  res.status(200).json(result);
};
