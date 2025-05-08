import { ORDER_TYPE } from "./constants";

export type Form = {
  symbol: string;
  buy: {
    id?: number;
    price: number;
    quantity: number;
    isEnabled: number;
  };
  sell: {
    id?: number;
    price: number;
    quantity: number;
    isEnabled: number;
  };
};
export const convertFormToRequest = (form: Form) => {
  const { symbol, buy, sell } = form;

  return [
    {
      id: buy.id,
      symbol,
      targetPrice: buy.price,
      quantity: buy.quantity,
      type: ORDER_TYPE.BUY,
      isEnabled: buy.isEnabled,
    },
    {
      id: sell.id,
      symbol,
      targetPrice: sell.price,
      quantity: sell.quantity,
      type: ORDER_TYPE.SELL,
      isEnabled: sell.isEnabled,
    },
  ];
};
