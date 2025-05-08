import { symbol } from "zod";
import { ORDER_TYPE } from "./constants";

type OrderList = {
  id?: number;
  symbol: string;
  targetPrice: number;
  quantity: number;
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
      price: buyOrder?.targetPrice,
      quantity: buyOrder?.quantity,
      isEnabled: buyOrder?.isEnabled,
    },
    sell: {
      id: sellOrder?.id,
      price: sellOrder?.targetPrice,
      quantity: sellOrder?.quantity,
      isEnabled: sellOrder?.isEnabled,
    },
  };
};

const findOrder = (orderList: OrderList[], type: number) =>
  orderList.find((order) => order.type === type);
