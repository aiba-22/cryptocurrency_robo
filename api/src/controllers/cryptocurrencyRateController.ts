import { Request, Response } from "express";
import GmoApiService from "../service/gmoApiService";

export const get = async (_req: Request, res: Response) => {
  const gmoApiService = new GmoApiService();
  const result = await gmoApiService.fetchTradingRateList();
  res.json(result);
};
