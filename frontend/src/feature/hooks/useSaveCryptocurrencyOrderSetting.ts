import { useMutation } from "react-query";
import {
  convertFormToRequest,
  Form,
} from "../automaticTrading/convertFormToRequest";
import {
  createCryptocurrencyOrder,
  updateCryptocurrencyOrder,
} from "../../apiClients/cryptocurrencyOrder";

export const useSaveCryptocurrencyOrderSetting = () => {
  const { mutate, status } = useMutation(
    async (cryptocurrencyOrderSetting: Form) => {
      const orderList = convertFormToRequest(cryptocurrencyOrderSetting);
      orderList.forEach(async (order) => {
        if (order.id) {
          await updateCryptocurrencyOrder(order);
        } else {
          await createCryptocurrencyOrder(order);
        }
      });
    }
  );

  return {
    saveOrderSetting: mutate,
    orderSettingSaveStatus: status,
  };
};
