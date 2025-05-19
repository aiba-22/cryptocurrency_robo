import GmoService from "../service/gmo";
import LineService from "../service/line";
import PriceAlertService from "../service/priceAlert";

export const autoAlert = async () => {
  const priceAlertService = new PriceAlertService();
  const priceAlert = await priceAlertService.find();
  if (!priceAlert) return;

  const { isUpperLimit, symbol, price } = priceAlert.conditions;

  const gmoService = new GmoService();

  const tradingPrice = await gmoService.fetchTradingPrice(symbol);
  if (!tradingPrice) return;

  const shouldNotify =
    (isUpperLimit && tradingPrice > price) ||
    (!isUpperLimit && tradingPrice < price);

  if (!shouldNotify) return;

  const lineService = new LineService();
  await lineService.sendMessage(`現在の価格は${tradingPrice}円です。`);
};
