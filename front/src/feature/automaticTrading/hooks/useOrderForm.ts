import { useForm } from "react-hook-form";
import { CRYPTOCURRENCY } from "../../constants";
import { IS_ENABLED } from "../constants";
import { useSaveCryptocurrencyOrderSetting } from "../../hooks/useSaveCryptocurrencyOrderSetting";
import {
  mapFormToOrderRequests,
  mapOrderListToFormValues,
} from "../orderFormMapper.ts";

import { listCryptocurrencyOrder } from "../../../apiClients/cryptocurrencyOrder";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export type Conditions = {
  id?: number;
  targetPrice: number;
  volume: number;
  isEnabled: number;
};

export type CryptocurrencyOrderForm = {
  symbol: string;
  buy: Conditions;
  sell: Conditions;
};

export const useOrderForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CryptocurrencyOrderForm>({
    defaultValues: {
      symbol: CRYPTOCURRENCY.BTC,
      buy: {
        targetPrice: undefined,
        volume: undefined,
        isEnabled: IS_ENABLED.FALSE,
      },
      sell: {
        targetPrice: undefined,
        volume: undefined,
        isEnabled: IS_ENABLED.FALSE,
      },
    },
  });

  const { saveOrderSetting, orderSaveStatus } =
    useSaveCryptocurrencyOrderSetting();

  const onSubmit = (formData: CryptocurrencyOrderForm) => {
    const [buyOrder, sellOrder] = mapFormToOrderRequests(formData);
    if (sellOrder) {
      saveOrderSetting(sellOrder);
    }

    if (buyOrder) {
      saveOrderSetting(buyOrder);
    }
  };

  const {
    data: cryptocurrencyOrderList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["useListCryptocurrencyOrder"],
    queryFn: listCryptocurrencyOrder,
  });

  useEffect(() => {
    if (cryptocurrencyOrderList) {
      reset(mapOrderListToFormValues(cryptocurrencyOrderList));
    }
  }, [cryptocurrencyOrderList, reset]);

  return {
    control,
    submitForm: handleSubmit(onSubmit),
    watch,
    formErrors: errors,
    orderSaveStatus,
    isOrderListError: isError,
    isOrderListLoading: isLoading,
  };
};
