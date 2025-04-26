import { useQuery } from "react-query";
import { listCryptocurrencyRateRate } from "../../apiClients/gmo";
import { useState } from "react";

export const useCryptocurrencyRate = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["useCryptocurrencyRate"],
    queryFn: () => listCryptocurrencyRateRate(),
    onError: () => {
      setErrorMessage("システムエラー");
    },
  });

  const cryptocurrencyRate = (cryptocurrency: string) => {
    const cryptocurrencyRate = data.find((cryptocurrencyTradingPrice: any) => {
      return cryptocurrencyTradingPrice.symbol === cryptocurrency;
    });
    return cryptocurrencyRate;
  };

  return {
    cryptocurrencyradingPriceList: data,
    isVirtualCurrencyLoading: isLoading,
    isVirtualCurrencyError: isError,
    errorMessage,
    cryptocurrencyRate,
  };
};
