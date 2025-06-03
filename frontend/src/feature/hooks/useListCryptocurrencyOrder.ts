import { useQuery } from "react-query";
import { listCryptocurrencyOrder } from "../../apiClients/cryptocurrencyOrder";

export const useListCryptocurrencyOrder = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["useListCryptocurrencyOrder"],
    queryFn: listCryptocurrencyOrder,
  });

  return {
    cryptocurrencyOrderList: data,
    isOrderListError: isError,
    isOrderListLoading: isLoading,
  };
};
