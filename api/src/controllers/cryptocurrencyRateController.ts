import { Request, Response } from "express";
import GmoService from "../service/gmo";

export const get = async (req: Request, res: Response) => {
  const gmoService = new GmoService();
  const result = await gmoService.fetchTradingPriceList();
  res.json(result);
};
