import {
  findNotificatioSetting,
  createNotificatioSetting,
  updateNotificatioSetting,
} from "../service/notificatioSetting.js";
import {
  createNotificationSchema,
  updateNotificationSchema,
} from "../service/notificatioSettingSchema.js";

export const getSettings = async (req, res) => {
  const id = req.query.id;
  try {
    const notificatioSetting = await findNotificatioSetting(id);
    res.json(notificatioSetting);
  } catch (error) {
    res.status(500).json({ error: "Error fetching settings" });
  }
};

export const createSettings = async (req, res) => {
  try {
    const validatedData = createNotificationSchema.parse(req.body);
    const { virtualCurrencyType, targetPrice, lineToken } = validatedData;
    const result = await createNotificatioSetting(
      virtualCurrencyType,
      targetPrice,
      lineToken
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const validatedData = updateNotificationSchema.parse(req.body);
    const { id, virtualCurrencyType, targetPrice, lineToken } = validatedData;
    const result = await updateNotificatioSetting(
      id,
      virtualCurrencyType,
      targetPrice,
      lineToken
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};
