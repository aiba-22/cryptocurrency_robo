import { useQuery } from "react-query";
import { listCryptocurrencyRateRate } from "../../apiClients/gmo";
import { useState } from "react";

export const useListCryptocurrencyRate = () => {
  const [resultCodeOfList, setResultCodeOfList] = useState({ code: "" });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["useCryptocurrencyRate"],
    queryFn: () => listCryptocurrencyRateRate(),
    onError: () => {
      setResultCodeOfList({ code: "systemErro" });
    },
  });

  const findCryptocurrencyRate = (cryptocurrency: string) => {
    if (!data) return;
    const cryptocurrencyRate = data.find((cryptocurrencyTradingPrice: any) => {
      return cryptocurrencyTradingPrice.symbol === cryptocurrency;
    });
    return cryptocurrencyRate;
  };

  return {
    cryptocurrencyradingPriceList: data,
    isVirtualCurrencyLoading: isLoading,
    isVirtualCurrencyError: isError,
    resultCodeOfList,
    findCryptocurrencyRate,
  };
};
