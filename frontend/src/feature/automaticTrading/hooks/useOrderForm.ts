import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { CRYPTOCURRENCY } from "../../constants";
import { IS_ENABLED, ORDER_TYPE } from "../constants";
import { useSaveCryptocurrencyOrderSetting } from "../../hooks/useSaveCryptocurrencyOrderSetting";
import { useListCryptocurrencyOrder } from "../../hooks/useListCryptocurrencyOrder";
import { convertToFormData } from "../convertToFormData";

export type OrderConditions = {
  id?: number;
  targetPrice: number;
  volume: number;
  isEnabled: number;
};

export type Form = {
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
  } = useForm<Form>({
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

  const onSubmit = (data: Form) => {
    const orderTypes: Record<"buy" | "sell", number> = {
      buy: ORDER_TYPE.BUY,
      sell: ORDER_TYPE.SELL,
    };

    const orderList: ("buy" | "sell")[] = ["buy", "sell"];

    orderList.forEach((key) => {
      const order = data[key];

      if (order) {
        const type = orderTypes[key];

        saveOrderSetting({
          id: order.id,
          symbol: data.symbol,
          type,
          volume: Number(order.volume),
          targetPrice: Number(order.targetPrice),
          isEnabled: order.isEnabled,
        });
      }
    });
  };

  useEffect(() => {
    if (cryptocurrencyOrderList) {
      reset(convertToFormData(cryptocurrencyOrderList));
    }
  }, [cryptocurrencyOrderList]);

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
