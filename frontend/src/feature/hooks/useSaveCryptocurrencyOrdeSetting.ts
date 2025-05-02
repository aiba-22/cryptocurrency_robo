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
      const orderList = convertFormToRequest(cryptocurrencyOrdeSetting);
      if (orderList[0].id) {
        await updateCryptocurrencyOrder(orderList);
      } else {
        await createCryptocurrencyOrder(orderList);
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
