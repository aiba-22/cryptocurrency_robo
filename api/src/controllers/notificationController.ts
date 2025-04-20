import { Request, Response } from "express";
import { LineService } from "../service/line";

export const line = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const { id, price } = req.body;
  const result = await lineService.send({ id, price });
  res.status(200).json(result);
};
