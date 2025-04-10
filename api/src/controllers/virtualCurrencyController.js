import { GmoService } from "../service/gmo.js";

export const get = async (req, res) => {
  const gmoService = new GmoService();
  const gmoResult = await gmoService.getTradingPrice(req.query.virtualCurrency);
  res.json(gmoResult.data);
};
