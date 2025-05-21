import { Request, Response } from "express";
import { lineNotificationSchema } from "../schema/lineSchema";
import { sendTestNotification } from "../useCase/sendLineNotification";

export const sendLineTestAlert = async (req: Request, res: Response) => {
  const { message } = lineNotificationSchema.parse(req.body);
  const result = await sendTestNotification(message);
  res.status(200).json(result);
};
