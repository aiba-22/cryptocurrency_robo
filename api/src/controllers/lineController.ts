import { Request, Response } from "express";
import LineService from "../service/line";
import { createLineSchema, upedateLineSchema } from "../schema/lineSchema";

export const get = async (req: Request, res: Response) => {
  const id = 1; //現状アカウント登録機能がついてないため、１のみを使用する想定
  const lineService = new LineService();
  const result = await lineService.find(id);
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const { lineToken, userId } = createLineSchema.parse(req.body);
  const result = await lineService.create({ lineToken, userId });
  res.status(200).json(result);
};

export const update = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const { id, lineToken, userId } = upedateLineSchema.parse(req.body);
  const result = await lineService.update({
    id,
    lineToken,
    userId,
  });
  res.status(200).json(result);
};
