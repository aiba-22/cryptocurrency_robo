import { useMutation } from "react-query";
import {
  createCryptocurrencyOrder,
  updateCryptocurrencyOrder,
} from "../../apiClients/cryptocurrencyOrder";
import { useState } from "react";

export type Form = {
  symbol: string;
  id?: number;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: boolean;
};

export const useSaveCryptocurrencyOrderSetting = () => {
  const [orderSettingSaveStatus, setOrderSettingSaveStatus] =
    useState<string>();
  const { mutate } = useMutation(
    async (order: Form) => {
      if (order.id) {
        return await updateCryptocurrencyOrder(order);
      } else {
        return await createCryptocurrencyOrder(order);
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
