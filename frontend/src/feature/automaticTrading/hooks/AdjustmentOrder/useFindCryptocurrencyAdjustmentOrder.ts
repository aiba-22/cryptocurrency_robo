import { useQuery } from "@tanstack/react-query";
import { findCryptocurrencyAdjustmentOrder } from "../../../../apiClients/cryptocurrencyAdjustmentOrder";

export const useFindCryptocurrencyAdjustmentOrder = () => {
  const {
    data: cryptocurrencyAdjustmentOrderList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["listCryptocurrencyAdjustmentOrder"],
    queryFn: findCryptocurrencyAdjustmentOrder,
  });

  return {
    cryptocurrencyAdjustmentOrderList,
    isOrderListError: isError,
    isOrderListLoading: isLoading,
  };
};
