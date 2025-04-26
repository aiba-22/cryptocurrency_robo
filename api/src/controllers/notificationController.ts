import { Request, Response } from "express";
import LineService from "../service/line";
import { lineNotificationSchema } from "../schema/lineSchema";

export const lineNotification = async (req: Request, res: Response) => {
  const lineService = new LineService();
  const id = 1; //現状アカウント登録機能がついてないため、１のみを使用する想定
  const { price } = lineNotificationSchema.parse(req.body);
  const result = await lineService.send({ id, price });
  res.status(200).json(result);
};
