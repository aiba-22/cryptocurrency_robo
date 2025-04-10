import { GmoSettingService } from "../service/gmoSetting.js";

export const get = async (req, res) => {
  const gmoSettingService = new GmoSettingService();
  const id = req.query.id;
  const gmoSetting = await gmoSettingService.find(id);
  res.json(gmoSetting);
};

export const create = async (req, res) => {
  const gmoSettingService = new GmoSettingService();
  console.log(req.body);
  const { apiKey, secretKey } = req.body;
  const result = await gmoSettingService.create(apiKey, secretKey);
  res.status(200).json(result);
};

export const update = async (req, res) => {
  const gmoSettingService = new GmoSettingService();
  const { id, virtualCurrencyType, targetPrice, lineToken } = req.body;
  const result = await gmoSettingService.update(
    id,
    virtualCurrencyType,
    targetPrice,
    lineToken
  );
  res.status(200).json(result);
};
