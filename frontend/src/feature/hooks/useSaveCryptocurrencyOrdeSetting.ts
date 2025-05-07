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
  const { mutate, status } = useMutation(
    async (cryptocurrencyOrdeSetting: Form) => {
      const orderList = convertFormToRequest(cryptocurrencyOrdeSetting);
      if (orderList[0].id) {
        await updateCryptocurrencyOrder(orderList);
      } else {
        await createCryptocurrencyOrder(orderList);
      }
    }
  );

  return {
    saveOrderSetting: mutate,
    orderSettingSaveStatus: status,
  };
};
