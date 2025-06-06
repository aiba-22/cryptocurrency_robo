import { useQuery } from "@tanstack/react-query";
import { listCryptocurrencyStaticOrder } from "../../../apiClients/cryptocurrencyStaticOrder";

export const useListCryptocurrencyStaticOrder = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["useListCryptocurrencyStaticOrder"],
    queryFn: listCryptocurrencyStaticOrder,
  });

  return {
    cryptocurrencyStaticOrderList: data,
    isOrderListError: isError,
    isOrderListLoading: isLoading,
  };
};
