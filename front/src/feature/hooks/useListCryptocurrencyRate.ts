import { useQuery } from "@tanstack/react-query";
import { listCryptocurrencyRate } from "../../apiClients/gmo";

export const useListCryptocurrencyRate = () => {
  const {
    data: cryptocurrencyRateMap,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["useCryptocurrencyRate"],
    queryFn: listCryptocurrencyRate,
    select: (cryptocurrencyRateList) => {
      const cryptocurrencyRateMap = new Map();
      cryptocurrencyRateList.forEach((cryptocurrencyRate) => {
        const { symbol, ...rate } = cryptocurrencyRate;
        cryptocurrencyRateMap.set(symbol, rate);
      });
      return cryptocurrencyRateMap;
    },
  });

  return {
    cryptocurrencyRateMap,
    isRateListError: isError,
    isRateListLoading: isLoading,
  };
};
