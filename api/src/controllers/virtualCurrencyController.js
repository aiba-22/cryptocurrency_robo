import { CoinCheckService } from "../service/coinCheck.js";

export const get = async (req, res) => {
  const coinCheckService = new CoinCheckService();
  const result = await coinCheckService.getPriceList(req.query.pair);
  res.json(result.data);
};
