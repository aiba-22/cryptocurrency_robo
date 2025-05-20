import { Request, Response } from "express";
import { lineNotificationSchema } from "../schema/lineSchema";
import { testAlert } from "../useCase/testAlert";

export const sendLineTestAlert = async (req: Request, res: Response) => {
  const { message } = lineNotificationSchema.parse(req.body);
  const result = testAlert(message);
  res.status(200).json(result);
};
