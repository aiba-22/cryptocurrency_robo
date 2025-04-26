import { useMutation } from "react-query";
import {
  createPriceAlert,
  updatePriceAlert,
} from "../../apiClients/priceAlert";
import { createLine, updateLine } from "../../apiClients/line";
import { useState } from "react";

type SaveTargetPriceParams = {
  id?: number;
  isUpperLimit: boolean;
  cryptocurrencyType: string;
  price: number;
  lineToken: string;
  userId: string;
};

export const useSaveTargetPriceSettings = () => {
  const [saveResultCode, setSaveResultCode] = useState({ status: "" });

  const { mutate: saveSettings, isLoading } = useMutation(
    async (params: SaveTargetPriceParams) => {
      const { id, isUpperLimit, cryptocurrencyType, price, lineToken, userId } =
        params;

      if (id) {
        await Promise.all([
          updatePriceAlert({ id, isUpperLimit, cryptocurrencyType, price }),
          updateLine({ id, lineToken, userId }),
        ]);
      } else {
        await Promise.all([
          createPriceAlert({ isUpperLimit, cryptocurrencyType, price }),
          createLine({ lineToken, userId }),
        ]);
      }
    },
    {
      onSuccess: () => {
        setSaveResultCode({ status: "successSaveTargetPriceSetting" });
      },
      onError: () => {
        setSaveResultCode({ status: "errorSaveTargetPriceSetting" });
      },
    }
  );

  return {
    saveSettings,
    saveResultCode,
    isLoading,
  };
};
