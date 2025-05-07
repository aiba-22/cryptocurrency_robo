import { useMutation } from "react-query";
import {
  createPriceAlert,
  updatePriceAlert,
} from "../../apiClients/priceAlert";

type SaveTargetPriceParams = {
  id?: number;
  isUpperLimit: boolean;
  symbol: string;
  price: number;
};

export const useSavePriceAlertSetting = () => {
  const { mutate, status } = useMutation(
    async (params: SaveTargetPriceParams) => {
      const { id, isUpperLimit, symbol, price } = params;

      if (id) {
        await updatePriceAlert({ id, isUpperLimit, symbol, price });
      } else {
        await createPriceAlert({ isUpperLimit, symbol, price });
      }
    }
  );

  return {
    saveAlertSetting: mutate,
    alertSettingSaveStatus: status,
  };
};
