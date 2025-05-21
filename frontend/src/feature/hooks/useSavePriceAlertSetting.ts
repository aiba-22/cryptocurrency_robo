import { useMutation } from "react-query";
import {
  createPriceAlert,
  updatePriceAlert,
} from "../../apiClients/priceAlert";
import { useState } from "react";

type SaveTargetPriceParams = {
  id?: number;
  isUpperLimit: boolean;
  symbol: string;
  price: number;
};

export const useSavePriceAlertSetting = () => {
  const [alertSettingSaveStatus, setAlertSettingSaveStatus] =
    useState<string>();

  const { mutate } = useMutation(
    async (params: SaveTargetPriceParams) => {
      const { id, isUpperLimit, symbol, price } = params;

      if (id) {
        return await updatePriceAlert({ id, isUpperLimit, symbol, price });
      } else {
        return await createPriceAlert({ isUpperLimit, symbol, price });
      }
    },
    {
      onSuccess: (data) => {
        setAlertSettingSaveStatus(data);
      },
      onError: () => {
        setAlertSettingSaveStatus("systemError");
      },
    }
  );

  return {
    saveAlertSetting: mutate,
    alertSettingSaveStatus: alertSettingSaveStatus,
  };
};
