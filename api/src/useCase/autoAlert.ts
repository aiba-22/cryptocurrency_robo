import GmoApiService from "../service/gmoApiService";
import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";
import PriceAlertService from "../service/priceAlertService";

export const autoAlert = async () => {
  const priceAlertService = new PriceAlertService();
  const priceAlert = await priceAlertService.find();
  if (!priceAlert) return;

  const { isUpperLimit, symbol, price } = priceAlert.conditions;

  const gmoApiService = new GmoApiService();

  const tradingPrice = await gmoApiService.fetchTradingPrice(symbol);
  if (!tradingPrice) return;

  const shouldNotify =
    (isUpperLimit && tradingPrice > price) ||
    (!isUpperLimit && tradingPrice < price);

  if (!shouldNotify) return;

  const lineService = new LineService();
  const line = await lineService.find();
  if (!line?.channelAccessToken || !line?.userId) return;
  const { userId, channelAccessToken } = line;

  const lineApiService = new LineApiService();
  await lineApiService.sendMessage({
    message: `アラート通知です。${symbol}の価格が${tradingPrice}になりました。`,
    userId,
    channelAccessToken,
  });
};
