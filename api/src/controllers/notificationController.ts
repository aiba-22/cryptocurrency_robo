import { Request, Response } from "express";
import LineService from "../service/line";
import { lineNotificationSchema } from "../schema/lineSchema";

export const lineNotification = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const { message } = lineNotificationSchema.parse(req.body);
  const result = await lineService.sendMessage(message);
  res.status(200).json(result);
};
