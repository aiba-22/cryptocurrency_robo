import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { CRYPTOCURRENCY } from "../../constants";
import { IS_ENABLED } from "../constants";
import { useSaveCryptocurrencyOrderSetting } from "../../hooks/useSaveCryptocurrencyOrderSetting";
import { useListCryptocurrencyOrder } from "../../hooks/useListCryptocurrencyOrder";
import {
  mapFormToOrderRequests,
  mapOrderListToFormValues,
} from "../orderFormMapper.ts";

export type OrderConditions = {
  id?: number;
  targetPrice: number;
  volume: number;
  isEnabled: number;
};

export type OrderFormValues = {
  symbol: string;
  buy: OrderConditions;
  sell: OrderConditions;
};

export const useOrderForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({
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

  const { saveOrderSetting, orderSettingSaveStatus } =
    useSaveCryptocurrencyOrderSetting();

  const { cryptocurrencyOrderList, isOrderListError, isOrderListLoading } =
    useListCryptocurrencyOrder();

  const onSubmit = (data: OrderFormValues) => {
    const [buyOrder, sellOrder] = mapFormToOrderRequests(data);

    if (sellOrder) {
      saveOrderSetting(sellOrder);
    }

    if (buyOrder) {
      saveOrderSetting(buyOrder);
    }
  };

  useEffect(() => {
    if (cryptocurrencyOrderList) {
      reset(mapOrderListToFormValues(cryptocurrencyOrderList));
    }
  }, [cryptocurrencyOrderList, reset]);

  return {
    control,
    submitForm: handleSubmit(onSubmit),
    watch,
    errors,
    orderSettingSaveStatus,
    isOrderListError,
    isOrderListLoading,
  };
};
