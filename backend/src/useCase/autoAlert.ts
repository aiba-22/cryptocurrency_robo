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

export const autoAlert = async () => {
  const priceAlertCondition = await getPriceAlertCondition();
  if (!priceAlertCondition) return;

  const tradingPrice = await fetchCurrentPrice(priceAlertCondition.symbol);
  if (!tradingPrice) return;

  if (!shouldNotify(tradingPrice, priceAlertCondition)) return;

  const lineCredentials = await getLine();
  if (!lineCredentials) return;

  await notifyLine(lineCredentials, priceAlertCondition.symbol, tradingPrice);
};

const getPriceAlertCondition = async (): Promise<
  PriceAlertCondition | undefined
> => {
  const service = new PriceAlertService();
  const alert = await service.find();
  if (!alert) return;

  const conditions = alert.conditions;
  return isPriceAlertCondition(conditions) ? conditions : undefined;
};

const fetchCurrentPrice = async (symbol: string): Promise<number | null> => {
  const gmoApiService = new GmoApiService({
    apiKey: "apiKey",
    secretKey: "secretKey",
  });

  const result = await gmoApiService.fetchTradingPrice(symbol);
  return result.status === "success" && result.price ? result.price : null;
};

const shouldNotify = (
  currentPrice: number,
  condition: PriceAlertCondition
): boolean => {
  return condition.isUpperLimit
    ? currentPrice > condition.price
    : currentPrice < condition.price;
};

const getLine = async (): Promise<{
  lineUserId: string;
  channelAccessToken: string;
} | null> => {
  const service = new LineService();
  const line = await service.find();
  if (!line?.channelAccessToken || !line?.lineUserId) return null;

  return {
    lineUserId: line.lineUserId,
    channelAccessToken: line.channelAccessToken,
  };
};

const notifyLine = async (
  creds: { lineUserId: string; channelAccessToken: string },
  symbol: string,
  price: number
) => {
  const lineApi = new LineApiService(creds);
  await lineApi.sendMessage(
    `アラート通知です。${symbol}の価格が${price}になりました。`
  );
};
