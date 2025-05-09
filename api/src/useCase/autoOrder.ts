import { ORDER_SIDE, ORDER_TYPE } from "../service/constants";
import CryptocurrencyOrderService from "../service/cryptocurrencyOrder";
import GmoService from "../service/gmo";
import LineService from "../service/line";

export const autoOrder = async () => {
  const cryptocurrencyOrderService = new CryptocurrencyOrderService();
  const orderList = await cryptocurrencyOrderService.list();
  if (orderList.length === 0) return;

  const buyOrder = orderList.find((order) => order.type === ORDER_TYPE.BUY);
  const sellOrder = orderList.find((order) => order.type === ORDER_TYPE.SELL);

  const gmoService = new GmoService();
  const tradingRateList = await gmoService.fetchTradingRateList();
  if (tradingRateList.length === 0) return;

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
  await lineService.sendMessage(
    `チェック中です、買い判定：${isTargetBuyPrice},売り判定：${isTargetSellPrice}`
  );

  if (isTargetBuyPrice && buyOrder) {
    const result = await gmoService.order({
      symbol: buyOrder.symbol,
      side: ORDER_SIDE.BUY,
      price: buyOrder.targetPrice,
      size: buyOrder.volume,
    });
    await lineService.sendMessage(
      `買い注文をしました${JSON.stringify(result)}`
    );
    return;
  }

  if (isTargetSellPrice && sellOrder) {
    const result = await gmoService.order({
      symbol: sellOrder?.symbol,
      side: ORDER_SIDE.SELL,
      price: sellOrder?.targetPrice,
      size: sellOrder?.volume,
    });
    await lineService.sendMessage(
      `売り注文をしました${JSON.stringify(result)}`
    );
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
