import { useMutation } from "react-query";
import {
  createCryptocurrencyOrder,
  updateCryptocurrencyOrder,
} from "../../apiClients/cryptocurrencyOrder";
import { useState } from "react";

export type Form = {
  id?: number;
  symbol: string;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
};

export const useSaveCryptocurrencyOrderSetting = () => {
  const [orderSaveStatus, setOrderSaveStatus] = useState<string>();
  const { mutate } = useMutation(
    async (order: Form) => {
      const { id, ...orderDetails } = order;
      if (id) {
        return await updateCryptocurrencyOrder({
          id,
          ...orderDetails,
        });
      } else {
        return await createCryptocurrencyOrder({ ...orderDetails });
      }
    },
    {
      onSuccess: (data) => {
        setOrderSaveStatus(data);
      },
      onError: () => {
        setOrderSaveStatus("systemError");
      },
    }
  );

  return {
    saveOrderSetting: mutate,
    orderSaveStatus,
  };
};
