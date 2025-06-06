import { ORDER_SIDE, ORDER_TYPE } from "../service/constants";
import GmoService from "../service/gmoService";
import GmoApiService from "../service/gmoApiService";
import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";
import CryptocurrencyStaticOrderService from "../service/cryptocurrencyStaticOrderService";

export const autoOrder = async () => {
  const gmoCredentials = await getGmo();
  if (!gmoCredentials) return;

  const gmoApiService = new GmoApiService(gmoCredentials);
  const tradingRateMap = await getTradingRateMap(gmoApiService);
  if (!tradingRateMap) return;

  const orderService = new CryptocurrencyStaticOrderService();
  const allOrders = await orderService.list();
  if (allOrders.length === 0) return;

  const validOrders = allOrders.filter(
    (order: { symbol: string; targetPrice: number; type: number }) =>
      isPriceConditionMet(order, tradingRateMap)
  );
  if (validOrders.length === 0) return;

  const lineCredentials = await getLine();
  if (!lineCredentials) return;

  const lineApiService = new LineApiService(lineCredentials);

  for (const order of validOrders) {
    await processOrder({ order, gmoApiService, lineApiService });
  }
};

const getGmo = async () => {
  const gmoService = new GmoService();
  const gmo = await gmoService.find();
  if (!gmo?.apiKey || !gmo?.secretKey) return null;
  return { apiKey: gmo.apiKey, secretKey: gmo.secretKey };
};

const getTradingRateMap = async (gmoApiService: GmoApiService) => {
  const { status, rateList } = await gmoApiService.fetchTradingRateList();
  if (status !== "success" || !rateList) return null;

  const rateMap = new Map<string, number>();
  for (const { symbol, last } of rateList) {
    rateMap.set(symbol, parseFloat(last));
  }
  return rateMap;
};

const getLine = async () => {
  const lineService = new LineService();
  const line = await lineService.find();
  if (!line?.channelAccessToken || !line?.lineUserId) return null;
  return {
    lineUserId: line.lineUserId,
    channelAccessToken: line.channelAccessToken,
  };
};

const isPriceConditionMet = (
  order: {
    symbol: string;
    targetPrice: number;
    type: number;
  },
  tradingRateMap: Map<string, number>
) => {
  const rate = tradingRateMap.get(order.symbol);
  if (rate === undefined) return false;

  return order.type === ORDER_TYPE.BUY
    ? rate <= order.targetPrice
    : rate >= order.targetPrice;
};

const processOrder = async ({
  order,
  gmoApiService,
  lineApiService,
}: {
  order: {
    symbol: string;
    targetPrice: number;
    volume: number;
    type: number;
  };
  gmoApiService: GmoApiService;
  lineApiService: LineApiService;
}) => {
  const side = order.type === ORDER_TYPE.BUY ? ORDER_SIDE.BUY : ORDER_SIDE.SELL;

  const result = await gmoApiService.order({
    symbol: order.symbol,
    side,
    price: order.targetPrice,
    size: order.volume,
  });

  const orderType = order.type === ORDER_TYPE.BUY ? "買い" : "売り";
  const resultMessage = result.status === "success" ? "成功" : "失敗";

  await lineApiService.sendMessage(
    `${orderType}注文に${resultMessage}しました。`
  );
};
