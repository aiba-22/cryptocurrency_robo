import { useMutation } from "react-query";
import {
  createCryptocurrencyOrder,
  updateCryptocurrencyOrder,
} from "../../apiClients/cryptocurrencyOrder";

export type Form = {
  symbol: string;
  id?: number;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
};

export const useSaveCryptocurrencyOrderSetting = () => {
  const { mutate, status } = useMutation(async (order: Form) => {
    if (order.id) {
      await updateCryptocurrencyOrder(order);
    } else {
      await createCryptocurrencyOrder(order);
    }
  });

  return {
    saveOrderSetting: mutate,
    orderSettingSaveStatus: status,
  };
};
