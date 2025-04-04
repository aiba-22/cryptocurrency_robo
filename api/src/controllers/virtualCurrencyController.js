import { GmoService } from "../service/virtualCurrency/gmo.js";

export const get = async (req, res) => {
  const gmoService = new GmoService();
  const gmoResult = await gmoService.getTradingPrice(req.query.virtualCurrency);

  res.json(gmoResult.data);
};
