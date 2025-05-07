import { useQuery } from "react-query";
import {
  CryptocurrencyRateList,
  listCryptocurrencyRate,
} from "../../apiClients/gmo";

export type CryptocurrencyRateMap = {
  last: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  volume: number;
  timestamp: Date;
};

export const useListCryptocurrencyRate = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["useCryptocurrencyRate"],
    queryFn: listCryptocurrencyRate,
    select: (data) => {
      const cryptocurrencyRateMap = data.reduce(
        (
          map: Map<string, CryptocurrencyRateMap>,
          cryptocurrencyRate: CryptocurrencyRateList
        ) => {
          const { symbol, ...rate } = cryptocurrencyRate;
          map.set(symbol, rate);
          return map;
        },
        new Map()
      );
      return cryptocurrencyRateMap;
    },
  });

  return {
    cryptocurrencyRateMap: data,
    isRateListError: isError,
    isRateListLoading: isLoading,
  };
};
