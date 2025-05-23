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
  const [orderSettingSaveStatus, setOrderSettingSaveStatus] =
    useState<string>();
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
        setOrderSettingSaveStatus(data);
      },
      onError: () => {
        setOrderSettingSaveStatus("systemError");
      },
    }
  );

  return {
    saveOrderSetting: mutate,
    orderSettingSaveStatus,
  };
};
