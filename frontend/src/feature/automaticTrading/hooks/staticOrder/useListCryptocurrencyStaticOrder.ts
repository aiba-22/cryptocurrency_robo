import { useQuery } from "@tanstack/react-query";
import { listCryptocurrencyStaticOrder } from "../../../../apiClients/cryptocurrencyStaticOrder";

export const useListCryptocurrencyStaticOrder = () => {
  const {
    data: cryptocurrencyStaticOrderList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["listCryptocurrencyStaticOrder"],
    queryFn: listCryptocurrencyStaticOrder,
  });

  return {
    cryptocurrencyStaticOrderList,
    isOrderListError: isError,
    isOrderListLoading: isLoading,
  };
};
