import { Request, Response } from "express";
import { GmoService } from "../service/gmo";

export const get = async (req: Request, res: Response) => {
  const gmoService = new GmoService();
  const gmoResult = await gmoService.getTradingPrice();
  res.json(gmoResult.data);
};
