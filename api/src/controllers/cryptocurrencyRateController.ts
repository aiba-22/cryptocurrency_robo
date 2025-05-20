import { Request, Response } from "express";
import GmoService from "../service/gmoApiService";

export const get = async (req: Request, res: Response) => {
  const gmoService = new GmoService();
  const result = await gmoService.fetchTradingRateList();
  res.json(result);
};
