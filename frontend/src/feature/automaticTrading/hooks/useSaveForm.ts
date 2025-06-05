import { useState } from "react";
import { mapFormToOrderRequests } from "../orderFormMapper.ts";
import { useMutation } from "@tanstack/react-query";
import {
  createCryptocurrencyOrder,
  updateCryptocurrencyOrder,
} from "../../../apiClients/cryptocurrencyOrder";
import type { CryptocurrencyOrderForm } from "../../../components/automaticTrading/AutomaticTrading.tsx";

type Form = {
  id?: number;
  symbol: string;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
};

export const useSaveForm = () => {
  const [orderSaveStatus, setOrderSaveStatus] = useState<string>();

  const { mutate } = useMutation({
    mutationFn: async (order: Form) => {
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
    onSuccess: () => {
      setOrderSaveStatus("success");
    },
    onError: () => {
      setOrderSaveStatus("systemError");
    },
  });

  const saveOrderForm = (formData: CryptocurrencyOrderForm) => {
    const [buyOrder, sellOrder] = mapFormToOrderRequests(formData);
    if (sellOrder) {
      mutate(sellOrder);
    }

    if (buyOrder) {
      mutate(buyOrder);
    }
  };
  return {
    saveOrderForm,
    orderSaveStatus,
  };
};
