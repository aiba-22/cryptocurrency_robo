import { Request, Response } from "express";
import CryptocurrencyStaticOrderService from "../service/cryptocurrencyStaticOrderService";
import {
  createCryptocurrencyStaticOrderSchema,
  updateCryptocurrencyStaticOrderSchema,
} from "../schema/cryptocurrencyStaticOrderSchema";

export const list = async (_req: Request, res: Response) => {
  const cryptocurrencyStaticOrderService =
    new CryptocurrencyStaticOrderService();
  const result = await cryptocurrencyStaticOrderService.list();
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const validatedData = createCryptocurrencyStaticOrderSchema.parse(req.body);
  const cryptocurrencyStaticOrderService =
    new CryptocurrencyStaticOrderService();
  const result = await cryptocurrencyStaticOrderService.create(validatedData);
  res.status(200).json(result);
};

export const update = async (req: Request, res: Response) => {
  const validatedData = updateCryptocurrencyStaticOrderSchema.parse(req.body);
  const cryptocurrencyStaticOrderService =
    new CryptocurrencyStaticOrderService();
  const result = await cryptocurrencyStaticOrderService.update(validatedData);
  res.status(200).json(result);
};
