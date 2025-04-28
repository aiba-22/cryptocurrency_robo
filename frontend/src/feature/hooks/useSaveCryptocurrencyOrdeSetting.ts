import { useState } from "react";
import { useMutation } from "react-query";
import {
  convertFormToRequest,
  Form,
} from "../automaticTrading/convertFormToRequest";
import {
  createCryptocurrencyOrder,
  updateCryptocurrencyOrder,
} from "../../apiClients/cryptocurrencyOrder";

export const useSaveCryptocurrencyOrdeSetting = () => {
  const [resultCodeOfSave, setResultCodeOfSave] = useState({ code: "" });

  const {
    mutate: saveSetting,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(
    async (cryptocurrencyOrdeSetting: Form) => {
      const [buyOrder, sellOrder] = convertFormToRequest(
        cryptocurrencyOrdeSetting
      );
      if (buyOrder.id) {
        await updateCryptocurrencyOrder(buyOrder);
      } else {
        await createCryptocurrencyOrder(buyOrder);
      }

      if (sellOrder.id) {
        await updateCryptocurrencyOrder(sellOrder);
      } else {
        await createCryptocurrencyOrder(sellOrder);
      }
    },
    {
      onSuccess: () => {
        setResultCodeOfSave({ code: "successSaveCryptocurrencyOrdeSetting" });
      },
      onError: () => {
        setResultCodeOfSave({ code: "errorSaveCryptocurrencyOrdeSetting" });
      },
    }
  );

  return {
    saveSetting,
    resultCodeOfSave,
    isLoading,
    isError,
    isSuccess,
  };
};
