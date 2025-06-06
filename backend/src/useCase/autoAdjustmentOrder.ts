import { ORDER_SIDE } from "../service/constants";
import GmoService from "../service/gmoService";
import GmoApiService from "../service/gmoApiService";
import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";
import CryptocurrencyAdjustmentOrderService from "../service/cryptocurrencyAdjustmentOrderService";

export const autoAdjustmentOrder = async () => {
  const gmo = await FileSystemDirectoryHandleGmo();
  if (!gmo) return;

  const gmoApiService = new GmoApiService(gmo);
  const tradingRateMap = await mapTradingRate(gmoApiService);
  if (!tradingRateMap) return;

  const orderService = new CryptocurrencyAdjustmentOrderService();
  const order = await orderService.find();
  if (!order || !order.isEnabled) return;

  const line = await findLine();
  if (!line) return;
  const lineApiService = new LineApiService(line);

  const currentRate = tradingRateMap.get(order.symbol);
  if (!currentRate) return;

  const side = orderSide(order, currentRate);
  if (!side) return;

  const result = processAdjustmentOrder(
    order,
    currentRate,
    side,
    gmoApiService,
    lineApiService,
    orderService
  );
  if (!result) return;

  await orderService.update({
    id: order.id,
    symbol: order.symbol,
    basePrice: currentRate,
  });
};

const FileSystemDirectoryHandleGmo = async () => {
  const gmoService = new GmoService();
  const gmo = await gmoService.find();
  if (!gmo?.apiKey || !gmo?.secretKey) return null;
  return { apiKey: gmo.apiKey, secretKey: gmo.secretKey };
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

const mapTradingRate = async (gmoApiService: GmoApiService) => {
  const { status, rateList } = await gmoApiService.fetchTradingRateList();
  if (status !== "success" || !rateList) return null;

  const rateMap = new Map<string, number>();
  for (const { symbol, last } of rateList) {
    rateMap.set(symbol, parseFloat(last));
  }
  return rateMap;
};

const orderSide = (
  order: { basePrice: number; priceAdjustmentRate: number },
  currentRate: number
): string | undefined => {
  const thresholdUp = order.basePrice * (1 + order.priceAdjustmentRate);
  const thresholdDown = order.basePrice * (1 - order.priceAdjustmentRate);

  if (currentRate <= thresholdDown) return ORDER_SIDE.BUY;
  if (currentRate >= thresholdUp) return ORDER_SIDE.SELL;
  return undefined;
};

const processAdjustmentOrder = async (
  order: {
    id: number;
    symbol: string;
    basePrice: number;
    volumeAdjustmentRate: number;
  },
  price: number,
  side: string,
  gmoApiService: GmoApiService,
  lineApiService: LineApiService,
  orderService: CryptocurrencyAdjustmentOrderService
) => {
  const volume = price * order.volumeAdjustmentRate;
  // const result = await gmoApiService.order({
  //   symbol: order.symbol,
  //   side,
  //   price,
  //   size: volume,
  // });
  console.log(
    `注文処理: ${order.symbol}, 価格: ${price}, ボリューム: ${volume}, サイド: ${side}`
  );

  const result = { status: "success" };
  const resultMessage = result.status === "success" ? "成功" : "失敗";
  const orderType = side === ORDER_SIDE.BUY ? "買い" : "売り";
  await lineApiService.sendMessage(
    `${order.symbol}の${orderType}注文（${price.toFixed(2)}円, ${volume.toFixed(
      4
    )}）が${resultMessage}しました。`
  );
};
