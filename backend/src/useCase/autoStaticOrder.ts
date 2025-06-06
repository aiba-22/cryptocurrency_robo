import { ORDER_SIDE, ORDER_TYPE } from "../service/constants";
import GmoService from "../service/gmoService";
import GmoApiService from "../service/gmoApiService";
import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";
import CryptocurrencyStaticOrderService from "../service/cryptocurrencyStaticOrderService";

export const autoStaticOrder = async () => {
  const gmo = await findGmo();
  if (!gmo) return;

  const gmoApiService = new GmoApiService(gmo);
  const tradingRateMap = await mapTradingRate(gmoApiService);
  if (!tradingRateMap) return;

  const orderService = new CryptocurrencyStaticOrderService();
  const orderList = await orderService.list();
  if (orderList.length === 0) return;

  const validOrderList = orderList.filter((order) =>
    order.type === ORDER_TYPE.BUY
      ? isTargetBuyPrice(order.symbol, order.targetPrice, tradingRateMap)
      : isTargetSellPrice(order.symbol, order.targetPrice, tradingRateMap)
  );

  if (validOrderList.length === 0) return;

  const line = await findLine();
  if (!line) return;

  const lineApiService = new LineApiService(line);

  for (const order of validOrderList) {
    await processOrder({ order, gmoApiService, lineApiService });
  }
};

const findGmo = async () => {
  const gmoService = new GmoService();
  const gmo = await gmoService.find();
  if (!gmo?.apiKey || !gmo?.secretKey) return null;
  return { apiKey: gmo.apiKey, secretKey: gmo.secretKey };
};

const mapTradingRate = async (gmoApiService: GmoApiService) => {
  const { status, rateList } = await gmoApiService.fetchTradingRateList();
  if (status !== "success" || !rateList) return null;

  const rateMap = new Map<string, number>();
  for (const { symbol, last } of rateList) {
    rateMap.set(symbol, parseFloat(last));
  }
  return rateMap;
};

const findLine = async () => {
  const lineService = new LineService();
  const line = await lineService.find();
  if (!line?.channelAccessToken || !line?.lineUserId) return null;
  return {
    lineUserId: line.lineUserId,
    channelAccessToken: line.channelAccessToken,
  };
};

const isTargetBuyPrice = (
  symbol: string,
  targetPrice: number,
  tradingRateMap: Map<string, number>
): boolean => {
  const rate = tradingRateMap.get(symbol);
  if (rate === undefined) return false;
  return rate <= targetPrice;
};

const isTargetSellPrice = (
  symbol: string,
  targetPrice: number,
  tradingRateMap: Map<string, number>
): boolean => {
  const rate = tradingRateMap.get(symbol);
  if (rate === undefined) return false;
  return rate >= targetPrice;
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

  const orderType = side === ORDER_SIDE.BUY ? "買い" : "売り";
  const resultMessage = result.status === "success" ? "成功" : "失敗";

  await lineApiService.sendMessage(
    `${order.symbol}の${orderType}注文（${order.targetPrice}円, ${order.volume}）が${resultMessage}しました。`
  );
};
