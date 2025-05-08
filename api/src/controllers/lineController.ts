import { Request, Response } from "express";
import LineService from "../service/line";
import { createLineSchema, updateLineSchema } from "../schema/lineSchema";

export const get = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const result = await lineService.find();
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const { channelAccessToken, userId } = createLineSchema.parse(req.body);
  const result = await lineService.create({ channelAccessToken, userId });
  res.status(200).json(result);
};

export const update = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const { id, channelAccessToken, userId } = updateLineSchema.parse(req.body);
  const result = await lineService.update({
    id,
    channelAccessToken,
    userId,
  });
  res.status(200).json(result);
};
