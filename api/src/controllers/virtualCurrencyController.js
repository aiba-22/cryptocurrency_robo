import { CoinCheckService } from "../service/virtualCurrency/coinCheck.js";

export const get = async (req, res) => {
  const coinCheckService = new CoinCheckService();
  const result = await coinCheckService.getTradingPrice(
    req.query.virtualCurrency
  );
  res.json(result);
};
