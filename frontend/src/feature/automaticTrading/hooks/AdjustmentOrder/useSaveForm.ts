import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  createCryptocurrencyAdjustmentOrder,
  updateCryptocurrencyAdjustmentOrder,
} from "../../../../apiClients/cryptocurrencyAdjustmentOrder";

type Form = {
  id?: number;
  symbol: string;
  basePrice: number;
  priceAdjustmentRate: number;
  volumeAdjustmentRate: number;
  isEnabled: number;
};

export const useSaveForm = () => {
  const [orderSaveStatus, setOrderSaveStatus] = useState<string>();

  const { mutate } = useMutation({
    mutationFn: async (order: Form) => {
      const { id, ...orderDetails } = order;
      if (id) {
        return await updateCryptocurrencyAdjustmentOrder({
          id,
          ...orderDetails,
        });
      } else {
        return await createCryptocurrencyAdjustmentOrder({ ...orderDetails });
      }
    },
    onSuccess: () => {
      setOrderSaveStatus("success");
    },
    onError: () => {
      setOrderSaveStatus("systemError");
    },
  });

  const onSubmit = (data: Form) => {
    mutate(data);
  };

  return {
    saveOrderForm: onSubmit,
    orderSaveStatus,
  };
};
