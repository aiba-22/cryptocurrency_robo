import { listCryptocurrencyOrder } from "../../../apiClients/cryptocurrencyOrder";
import { useQuery } from "@tanstack/react-query";

export const useListCryptocurrencyOrder = () => {
  const {
    data: cryptocurrencyOrderList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["listCryptocurrencyOrder"],
    queryFn: listCryptocurrencyOrder,
  });

  return {
    cryptocurrencyOrderList,
    isOrderListError: isError,
    isOrderListLoading: isLoading,
  };
};
