import { Request, Response } from "express";
import CryptocurrencyOrderService from "../service/cryptocurrencyOrderService";
import {
  createCryptocurrencyOrderSchema,
  updateCryptocurrencyOrderSchema,
} from "../schema/cryptocurrencyOrderSchema";

export const list = async (_req: Request, res: Response) => {
  const cryptocurrencyOrderService = new CryptocurrencyOrderService();
  const result = await cryptocurrencyOrderService.list();
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const validatedData = createCryptocurrencyOrderSchema.parse(req.body);
  const cryptocurrencyOrderService = new CryptocurrencyOrderService();
  const result = await cryptocurrencyOrderService.create(validatedData);
  res.status(200).json(result);
};

export const update = async (req: Request, res: Response) => {
  const validatedData = updateCryptocurrencyOrderSchema.parse(req.body);
  const cryptocurrencyOrderService = new CryptocurrencyOrderService();
  const result = await cryptocurrencyOrderService.update(validatedData);
  res.status(200).json(result);
};
