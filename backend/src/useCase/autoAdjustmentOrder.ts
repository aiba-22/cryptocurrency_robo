import { ORDER_SIDE } from "../service/constants";
import GmoService from "../service/gmoService";
import GmoApiService from "../service/gmoApiService";
import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";
import CryptocurrencyAdjustmentOrderService from "../service/cryptocurrencyAdjustmentOrderService";

export const autoAdjustmentOrder = async () => {
  const gmo = await findGmo();
  if (!gmo) return;
  const gmoApiService = new GmoApiService(gmo);
  const tradingRateMap = await fetchTradingRateMap(gmoApiService);
  if (!tradingRateMap) return;

  const orderService = new CryptocurrencyAdjustmentOrderService();
  const order = await orderService.find();
  if (!order || !order.isEnabled) return;

  const currentRate = tradingRateMap.get(order.symbol);
  if (!currentRate) return;

  const side = getOrderSide(order, currentRate);
  if (!side) return;

  const assets = await gmoApiService.fetchAssets();
  const availableBySymbolMap = new Map<string, number>();
  if (assets.status !== "success" || !assets.data) {
    return;
  }
  assets.data?.forEach((asset) => {
    availableBySymbolMap.set(asset.symbol, asset.available);
  });
  if (!availableBySymbolMap) return;
  const availableAssets = availableBySymbolMap.get(order.symbol);
  if (!availableAssets) return;

  const adjustVolume =
    side === ORDER_SIDE.BUY
      ? order.buyVolumeAdjustmentRate
      : order.sellVolumeAdjustmentRate;

  const volume = adjustVolume * availableAssets;
  const result = await gmoApiService.order({
    symbol: order.symbol,
    side,
    price: currentRate,
    size: volume,
  });
  if (result) {
    await orderService.update({
      id: order.id,
      symbol: order.symbol,
      basePrice: currentRate,
    });
  }
  await sendMessage({
    symbol: order.symbol,
    side,
    price: currentRate,
    volume,
  });
};

const findGmo = async () => {
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

const fetchTradingRateMap = async (gmoApiService: GmoApiService) => {
  const { status, rateList } = await gmoApiService.fetchTradingRateList();
  if (status !== "success" || !rateList) return null;

  return new Map(
    rateList.map(({ symbol, last }) => [symbol, parseFloat(last)])
  );
};

const getOrderSide = (
  order: {
    basePrice: number;
    buyPriceAdjustmentRate: number;
    sellPriceAdjustmentRate: number;
  },
  currentRate: number
): string | undefined => {
  const targetBuy = order.basePrice * (1 - order.buyPriceAdjustmentRate);
  const targetSell = order.basePrice * (1 + order.sellPriceAdjustmentRate);

  if (currentRate <= targetBuy) return ORDER_SIDE.BUY;
  if (currentRate >= targetSell) return ORDER_SIDE.SELL;
  return undefined;
};

const sendMessage = async ({
  symbol,
  side,
  price,
  volume,
}: {
  symbol: string;
  side: string;
  price: number;
  volume: number;
}) => {
  const orderType = side === ORDER_SIDE.BUY ? "買い" : "売り";

  const line = await findLine();
  if (!line) return false;
  const lineApiService = new LineApiService(line);

  await lineApiService.sendMessage(
    `${symbol}の${orderType}注文（${price.toFixed(2)}円, ${volume.toFixed(
      4
    )}）を行いました。`
  );
};
