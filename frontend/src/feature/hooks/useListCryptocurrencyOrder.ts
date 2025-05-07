// hooks/useListCryptocurrencyOrder.ts
import { useQuery } from "react-query";
import { listCryptocurrencyOrder } from "../../apiClients/cryptocurrencyOrder";

export type Request = {
  id?: number;
  symbol: string;
  targetPrice: number;
  quantity: number;
  orderType: number;
  isEnabled: number;
};

export const useListCryptocurrencyOrder = () => {
  const { data, isError, isLoading } = useQuery<Request[]>({
    queryKey: ["useListCryptocurrencyOrder"],
    queryFn: listCryptocurrencyOrder,
  });

  return {
    cryptocurrencyOrderList: data,
    isOrderListError: isError,
    isOrderListLoading: isLoading,
  };
};
