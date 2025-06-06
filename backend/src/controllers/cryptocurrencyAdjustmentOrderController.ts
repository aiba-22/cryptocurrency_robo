import { Request, Response } from "express";
import CryptocurrencyAdjustmentOrderService from "../service/cryptocurrencyAdjustmentOrderService";
import {
  createCryptocurrencyAdjustmentOrderSchema,
  updateCryptocurrencyAdjustmentOrderSchema,
} from "../schema/cryptocurrencyAdjustmentOrderSchema";

export const get = async (_req: Request, res: Response) => {
  const cryptocurrencyAdjustmentOrderService =
    new CryptocurrencyAdjustmentOrderService();
  const result = await cryptocurrencyAdjustmentOrderService.find();
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const validatedData = createCryptocurrencyAdjustmentOrderSchema.parse(
    req.body
  );
  const cryptocurrencyAdjustmentOrderService =
    new CryptocurrencyAdjustmentOrderService();
  const result = await cryptocurrencyAdjustmentOrderService.create(
    validatedData
  );
  res.status(200).json(result);
};

export const update = async (req: Request, res: Response) => {
  const validatedData = updateCryptocurrencyAdjustmentOrderSchema.parse(
    req.body
  );
  const cryptocurrencyAdjustmentOrderService =
    new CryptocurrencyAdjustmentOrderService();
  const result = await cryptocurrencyAdjustmentOrderService.update(
    validatedData
  );
  res.status(200).json(result);
};
