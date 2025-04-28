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
  const [resultCodeOfList, setResultCodeOfList] = useState({ code: "" });

  const { data } = useQuery<Request[]>({
    queryKey: ["useListCryptocurrencyOrder"],
    queryFn: listCryptocurrencyOrder,
    onError: () => {
      setResultCodeOfList({ code: "systemError" });
    },
  });

  return { cryptocurrencyOrderList: data, resultCodeOfList };
};
