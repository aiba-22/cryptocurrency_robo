import {
  findNotificationSetting,
  createNotificationSetting,
  updateNotificationSetting,
} from "../service/notificationSetting.js";
import {
  createNotificationSchema,
  updateNotificationSchema,
} from "../service/notificationSettingSchema.js";

export const get = async (req, res) => {
  const id = req.query.id;
  const notificationSetting = await findNotificationSetting(id);
  res.json(notificationSetting);
};

export const create = async (req, res) => {
  const validatedData = createNotificationSchema.parse(req.body);
  const { virtualCurrencyType, targetPrice, lineToken } = validatedData;
  const result = await createNotificationSetting(
    virtualCurrencyType,
    targetPrice,
    lineToken
  );
  res.status(200).json(result);
};

export const update = async (req, res) => {
  const validatedData = updateNotificationSchema.parse(req.body);
  const { id, virtualCurrencyType, targetPrice, lineToken } = validatedData;
  const result = await updateNotificationSetting(
    id,
    virtualCurrencyType,
    targetPrice,
    lineToken
  );
  res.status(200).json(result);
};
