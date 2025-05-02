import { ORDER_SIDE, ORDER_TYPE } from "../service/constants";
import CryptocurrencyOrderService from "../service/cryptocurrencyOrder";
import GmoService from "../service/gmo";
import LineService from "../service/line";

export const autoOrder = async () => {
  const cryptocurrencyOrderService = new CryptocurrencyOrderService();
  const orderList = await cryptocurrencyOrderService.list();
  if (orderList.length === 0) return;

  const buyOrder = orderList.find(
    (order) => order.orderType === ORDER_TYPE.BUY
  );
  const sellOrder = orderList.find(
    (order) => order.orderType === ORDER_TYPE.SELL
  );

  const gmoService = new GmoService();
  const tradingRateList = await gmoService.fetchTradingRateList();
  if (tradingRateList.length === 0) return;

  const isTargetBuyPrice = checkPrice({
    tradingRateList,
    symbol: buyOrder?.symbol,
    targetPrice: buyOrder?.targetPrice,
    orderType: buyOrder?.orderType,
  });

  const isTargetSellPrice = checkPrice({
    tradingRateList,
    symbol: sellOrder?.symbol,
    orderType: sellOrder?.orderType,
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
      size: buyOrder.quantity,
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
      size: sellOrder?.quantity,
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
  orderType,
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
  orderType: number;
}) => {
  const rate = tradingRateList.find(
    (tradingRate) => tradingRate.symbol === symbol
  );

  if (!rate) return false;

  if (orderType === ORDER_TYPE.BUY) {
    return parseInt(rate.last) <= targetPrice;
  } else {
    return parseInt(rate.last) >= targetPrice;
  }
};
