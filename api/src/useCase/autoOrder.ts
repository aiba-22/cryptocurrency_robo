import { ORDER_SIDE, ORDER_TYPE } from "../service/constants";
import CryptocurrencyOrderService from "../service/cryptocurrencyOrderService";
import GmoService from "../service/gmoService";
import GmoApiService from "../service/gmoApiService";
import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";

export const autoOrder = async () => {
  const cryptocurrencyOrderService = new CryptocurrencyOrderService();
  const orderList = await cryptocurrencyOrderService.list();
  if (!orderList) return;

  const buyOrder = orderList.find((order) => order.type === ORDER_TYPE.BUY);
  const sellOrder = orderList.find((order) => order.type === ORDER_TYPE.SELL);

  const gmoService = new GmoService();
  const gmo = await gmoService.find();
  if (!gmo?.apiKey || !gmo?.secretKey) return;
  const { apiKey, secretKey } = gmo;

  const gmoApiService = new GmoApiService({ apiKey, secretKey });
  const tradingRateList = await gmoApiService.fetchTradingRateList();
  if (!tradingRateList) return;

  const isTargetBuyPrice = checkPrice({
    tradingRateList,
    symbol: buyOrder?.symbol,
    targetPrice: buyOrder?.targetPrice,
    type: buyOrder?.type,
  });

  const isTargetSellPrice = checkPrice({
    tradingRateList,
    symbol: sellOrder?.symbol,
    type: sellOrder?.type,
    targetPrice: sellOrder?.targetPrice,
  });

  const lineService = new LineService();
  const line = await lineService.find();
  if (!line?.channelAccessToken || !line?.lineUserId) return;
  const { lineUserId, channelAccessToken } = line;

  const lineApiService = new LineApiService({ lineUserId, channelAccessToken });

  if (isTargetBuyPrice && buyOrder) {
    const result = await gmoApiService.order({
      symbol: buyOrder.symbol,
      side: ORDER_SIDE.BUY,
      price: buyOrder.targetPrice,
      size: buyOrder.volume,
    });
    const resultMessage = result === "success" ? "成功" : "失敗";
    await lineApiService.sendMessage(`売り注文に${resultMessage}しました。`);
  }

  if (isTargetSellPrice && sellOrder) {
    const result = await gmoApiService.order({
      symbol: sellOrder?.symbol,
      side: ORDER_SIDE.SELL,
      price: sellOrder?.targetPrice,
      size: sellOrder?.volume,
    });
    const resultMessage = result === "success" ? "成功" : "失敗";
    await lineApiService.sendMessage(`買い注文に${resultMessage}しました。`);
  }
};

const checkPrice = ({
  tradingRateList,
  symbol,
  targetPrice,
  type,
}: {
  tradingRateList: {
    ask: string;
    bid: string;
    high: string;
    last: string;
    low: string;
    symbol: string;
    timestamp: string;
    volume: string;
  }[];
  symbol: string;
  targetPrice: number;
  type: number;
}) => {
  const rate = tradingRateList.find(
    (tradingRate) => tradingRate.symbol === symbol
  );

  if (!rate) return false;

  if (type === ORDER_TYPE.BUY) {
    return parseInt(rate.last) <= targetPrice;
  } else {
    return parseInt(rate.last) >= targetPrice;
  }
};
