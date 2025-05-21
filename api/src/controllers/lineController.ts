import { Request, Response } from "express";
import LineService from "../service/lineService";
import { createLineSchema, updateLineSchema } from "../schema/lineSchema";

export const get = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const result = await lineService.find();
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const { channelAccessToken, lineUserId } = createLineSchema.parse(req.body);
  const result = await lineService.create({ channelAccessToken, lineUserId });
  res.status(200).json(result);
};

export const update = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const { id, channelAccessToken, lineUserId } = updateLineSchema.parse(
    req.body
  );
  const result = await lineService.update({
    id,
    channelAccessToken,
    lineUserId,
  });
  res.status(200).json(result);
};
