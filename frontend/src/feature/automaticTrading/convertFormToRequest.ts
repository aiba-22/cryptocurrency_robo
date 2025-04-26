export type Form = {
  symbol: string;
  buyId?: number;
  buyPrice: number;
  buyQuantity: number;
  isBuyEnabled: boolean;
  sellId?: number;
  sellPrice: number;
  sellQuantity: number;
  isSellEnabled: boolean;
};

export const convertFormToRequest = (form: Form) => {
  const {
    symbol,
    buyId,
    buyPrice,
    buyQuantity,
    sellId,
    sellPrice,
    sellQuantity,
    isBuyEnabled,
    isSellEnabled,
  } = form;

  return [
    {
      id: buyId,
      symbol,
      targetPrice: buyPrice,
      quantity: buyQuantity,
      orderType: 0,
      isEnabled: isBuyEnabled ? 1 : 0,
    },
    {
      id: sellId,
      symbol,
      targetPrice: sellPrice,
      quantity: sellQuantity,
      orderType: 1,
      isEnabled: isSellEnabled ? 1 : 0,
    },
  ];
};
