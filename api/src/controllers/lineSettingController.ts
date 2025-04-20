import { Request, Response } from "express";
import { LineService } from "../service/line";
import { createLineSchema, upedateLineSchema } from "../schema/lineSchema";

export const get = async (req: Request, res: Response) => {
  const id = 1; //アカウントログインの対応がまだできてないので固定にする
  const line = new LineService();
  const result = await line.find(id);
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const validatedData = createLineSchema.parse(req.body);
  const { lineToken, userId } = validatedData;
  const result = await lineService.create({ lineToken, userId });
  res.status(200).json(result);
};

export const update = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const validatedData = upedateLineSchema.parse(req.body);
  const { id, lineToken, userId } = validatedData;
  const result = await lineService.update({
    id,
    lineToken,
    userId,
  });
  res.status(200).json(result);
};
