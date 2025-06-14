import { Request, Response } from "express";
import { lineNotificationSchema } from "../schema/lineSchema";
import { sendLineNotification } from "../useCase/sendLineNotification";

export const sendToLine = async (req: Request, res: Response) => {
  const { message } = lineNotificationSchema.parse(req.body);
  const result = await sendLineNotification(message);
  res.status(200).json(result);
};
