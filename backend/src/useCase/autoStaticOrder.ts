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

  const line = await findLine();
  if (!line) return;

  const lineApiService = new LineApiService(line);

  for (const order of orderList) {
    const rate = tradingRateMap.get(order.symbol);
    if (rate === undefined) continue;

    const shouldExecute =
      (order.type === ORDER_TYPE.BUY && rate > order.targetPrice) ||
      (order.type === ORDER_TYPE.SELL && rate < order.targetPrice);

    if (!shouldExecute) continue;

    const result = await executeOrder(gmoApiService, order);
    if (result.status === "success") {
      await lineApiService.sendMessage(
        `${order.symbol}の注文（${order.targetPrice}円, ${order.volume}）が成功しました。`
      );
      continue;
    }
  }
};

const executeOrder = async (
  gmoApiService: GmoApiService,
  order: { symbol: string; type: number; targetPrice: number; volume: number }
) => {
  return gmoApiService.order({
    symbol: order.symbol,
    side: order.type === ORDER_TYPE.BUY ? ORDER_SIDE.BUY : ORDER_SIDE.SELL,
    price: order.targetPrice,
    size: order.volume,
  });
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

  return new Map(
    rateList.map(({ symbol, last }) => [symbol, parseFloat(last)])
  );
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
