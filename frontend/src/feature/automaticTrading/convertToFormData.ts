import { Request } from "../hooks/useListCryptocurrencyOrder";

const getOrder = (orders: Request[], type: number) =>
  orders.find((r) => r.orderType === type);

export const convertToFormData = (orders?: Request[]) => {
  if (!orders) return undefined;

  const buyOrder = getOrder(orders, 0);
  const sellOrder = getOrder(orders, 1);

  const buy = {
    id: buyOrder?.id,
    symbol: buyOrder?.symbol ?? "",
    price: buyOrder?.targetPrice ?? 0,
    quantity: buyOrder?.quantity ?? 0,
    enabled: buyOrder?.isEnabled === 1 ? true : false,
  };

  const sell = {
    id: sellOrder?.id,
    symbol: sellOrder?.symbol ?? "",
    price: sellOrder?.targetPrice ?? 0,
    quantity: sellOrder?.quantity ?? 0,
    enabled: sellOrder?.isEnabled === 1 ? true : false,
  };

  return {
    symbol: buy.symbol || sell.symbol,
    buyId: buy.id,
    buyPrice: buy.price,
    buyQuantity: buy.quantity,
    isBuyEnabled: buy.enabled,
    sellId: sell.id,
    sellPrice: sell.price,
    sellQuantity: sell.quantity,
    isSellEnabled: sell.enabled,
  };
};
