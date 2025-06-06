import { useState } from "react";
import { mapFormToOrderRequests } from "../../orderFormMapper.ts";
import { useMutation } from "@tanstack/react-query";

import {
  createCryptocurrencyStaticOrder,
  updateCryptocurrencyStaticOrder,
} from "../../../../apiClients/cryptocurrencyStaticOrder.ts";
import type { CryptocurrencyStaticOrderForm } from "../../../../components/automaticTrading/staticTrading/StaticOrderTradingForm.tsx";

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
        return await updateCryptocurrencyStaticOrder({
          id,
          ...orderDetails,
        });
      } else {
        return await createCryptocurrencyStaticOrder({ ...orderDetails });
      }
    },
    onSuccess: () => {
      setOrderSaveStatus("success");
    },
    onError: () => {
      setOrderSaveStatus("systemError");
    },
  });

  const saveOrderForm = (formData: CryptocurrencyStaticOrderForm) => {
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
