// orderFormMapper.ts

import { ORDER_TYPE } from "./constants";
import { CryptocurrencyOrderForm } from "./hooks/useOrderForm";

export const mapFormToOrderRequests = (form: CryptocurrencyOrderForm) => {
  const symbol = form.symbol;

  const buyOrder = {
    ...form.buy,
    volume: Number(form.buy.volume),
    targetPrice: Number(form.buy.targetPrice),
    type: ORDER_TYPE.BUY,
    symbol,
  };

  const sellOrder = {
    ...form.sell,
    volume: Number(form.sell.volume),
    targetPrice: Number(form.sell.targetPrice),
    type: ORDER_TYPE.SELL,
    symbol,
  };

  return [buyOrder, sellOrder];
};

type OrderList = {
  id?: number;
  symbol: string;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
};

const findOrder = (orderList: OrderList[], type: number) =>
  orderList.find((order) => order.type === type);

export const mapOrderListToFormValues = (orderList: OrderList[]) => {
  if (orderList.length === 0) return undefined;

  const buyOrder = findOrder(orderList, ORDER_TYPE.BUY);
  const sellOrder = findOrder(orderList, ORDER_TYPE.SELL);

  return {
    symbol: buyOrder?.symbol || sellOrder?.symbol,
    buy: {
      id: buyOrder?.id,
      targetPrice: buyOrder?.targetPrice,
      volume: buyOrder?.volume,
      isEnabled: buyOrder?.isEnabled,
    },
    sell: {
      id: sellOrder?.id,
      targetPrice: sellOrder?.targetPrice,
      volume: sellOrder?.volume,
      isEnabled: sellOrder?.isEnabled,
    },
  };
};
