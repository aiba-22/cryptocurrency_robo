import GmoApiService from "../service/gmoApiService";
import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";
import PriceAlertService from "../service/priceAlertService";
import { JsonValue } from "@prisma/client/runtime/library";

type PriceAlertCondition = {
  isUpperLimit: boolean;
  symbol: string;
  price: number;
};

export const autoAlert = async () => {
  const priceAlertService = new PriceAlertService();
  const priceAlert = await priceAlertService.find();
  if (!priceAlert) return;

  const { conditions } = priceAlert;
  if (!isPriceAlertCondition(conditions)) return;
  const { isUpperLimit, symbol, price: targetPrice } = conditions;

  const gmoApiService = new GmoApiService();
  const tradingPrice = await gmoApiService.fetchTradingPrice(symbol);
  const { status, price: currentPrice } = tradingPrice;
  if (status !== "success" || !currentPrice) return;

  if (
    !isShouldNotify({
      currentPrice,
      isUpperLimit,
      targetPrice,
    })
  )
    return;

  const lineService = new LineService();
  const line = await lineService.find();
  if (!line?.channelAccessToken || !line?.lineUserId) return null;

  const lineApi = new LineApiService(line);
  await lineApi.sendMessage(
    `アラート通知です。${symbol}の価格が${currentPrice}になりました。`
  );
};

const isPriceAlertCondition = (
  data: JsonValue
): data is PriceAlertCondition => {
  return (
    typeof data === "object" &&
    data !== null &&
    "isUpperLimit" in data &&
    "symbol" in data &&
    "price" in data
  );
};

const isShouldNotify = ({
  currentPrice,
  isUpperLimit,
  targetPrice,
}: {
  currentPrice: number;
  isUpperLimit: boolean;
  targetPrice: number;
}): boolean => {
  const isShouldNotify = isUpperLimit
    ? currentPrice > targetPrice
    : currentPrice < targetPrice;
  return isShouldNotify;
};
