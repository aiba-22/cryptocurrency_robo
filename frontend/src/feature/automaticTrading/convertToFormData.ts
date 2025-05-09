import { symbol } from "zod";
import { ORDER_TYPE } from "../../components/automaticTrading/constants";

type OrderList = {
  id?: number;
  symbol: string;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
};

export const convertToFormData = (orderList: OrderList[]) => {
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

const findOrder = (orderList: OrderList[], type: number) =>
  orderList.find((order) => order.type === type);
