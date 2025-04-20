import { useQuery } from "react-query";
import { listVirtualCurrencyRate } from "../../apiClients/gmo";
import { useState } from "react";

export const useVirtualCurrencyRate = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["virtualCurrency"],
    queryFn: () => listVirtualCurrencyRate(),
    keepPreviousData: true,
    onError: () => {
      setErrorMessage("システムエラー");
    },
  });

  const virtualCurrencyRate = (virtualCurrency: string) => {
    const virtualCurrencyRate = data.find(
      (virtualCurrencyTradingPrice: any) => {
        return virtualCurrencyTradingPrice.symbol === virtualCurrency;
      }
    );
    return virtualCurrencyRate;
  };

  return {
    virtualCurrencyTradingPriceList: data,
    isVirtualCurrencyLoading: isLoading,
    isVirtualCurrencyError: isError,
    errorMessage,
    virtualCurrencyRate,
  };
};
