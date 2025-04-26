// hooks/useListCryptocurrencyOrder.ts
import { useQuery } from "react-query";
import { listCryptocurrencyOrder } from "../../apiClients/cryptocurrencyOrder";
import { useState } from "react";

export type Request = {
  id?: number;
  symbol: string;
  targetPrice: number;
  quantity: number;
  orderType: number;
  isEnabled: number;
};

export const useListCryptocurrencyOrder = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { data } = useQuery<Request[]>({
    queryKey: ["useListCryptocurrencyOrder"],
    queryFn: listCryptocurrencyOrder,
    onError: () => {
      setErrorMessage("システムエラー");
    },
  });

  return { cryptocurrencyOrderList: data, errorMessage };
};
