import { Request, Response } from "express";
import { NotificationSettingService } from "../service/notificationSetting";
import {
  createNotificationSchema,
  updateNotificationSchema,
} from "../schema/notificationSettingSchema";

export const get = async (req: Request, res: Response) => {
  const notificationSettingService = new NotificationSettingService();
  const id = 1; //複数登録の対応がまだできてないので固定にする
  const notificationSetting = await notificationSettingService.find(id);
  res.json(notificationSetting);
};

export const create = async (req: Request, res: Response) => {
  const notificationSettingService = new NotificationSettingService();
  const validatedData = createNotificationSchema.parse(req.body);
  const { virtualCurrencyType, targetPrice, lineToken, userId } = validatedData;
  const result = await notificationSettingService.create({
    virtualCurrencyType,
    targetPrice,
    lineToken,
    userId,
  });
  res.status(200).json(result);
};

export const update = async (req: Request, res: Response) => {
  const notificationSettingService = new NotificationSettingService();
  const validatedData = updateNotificationSchema.parse(req.body);
  const { id, virtualCurrencyType, targetPrice, lineToken, userId } =
    validatedData;
  const result = await notificationSettingService.update({
    id,
    virtualCurrencyType,
    targetPrice,
    lineToken,
    userId,
  });
  res.status(200).json(result);
};
