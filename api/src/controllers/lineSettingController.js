import { LineService } from "../service/line.js";
import {
  createNotificationSchema,
  updateNotificationSchema,
} from "../service/notificationSettingSchema.js";

export const get = async (req, res) => {
  const line = new LineService();
  const id = req.query.id;
  const result = await line.find(id);
  res.json(result);
};

export const create = async (req, res) => {
  const notificationSettingService = new NotificationSettingService();
  const validatedData = createNotificationSchema.parse(req.body);
  const { virtualCurrencyType, targetPrice, lineToken, userId } = validatedData;
  console.log("tuuka", userId);
  const result = await notificationSettingService.create(
    virtualCurrencyType,
    targetPrice,
    lineToken,
    userId
  );
  res.status(200).json(result);
};

export const update = async (req, res) => {
  const notificationSettingService = new NotificationSettingService();
  const validatedData = updateNotificationSchema.parse(req.body);
  const { id, virtualCurrencyType, targetPrice, lineToken, userId } =
    validatedData;
  const result = await notificationSettingService.update(
    id,
    virtualCurrencyType,
    targetPrice,
    lineToken,
    userId
  );
  res.status(200).json(result);
};
