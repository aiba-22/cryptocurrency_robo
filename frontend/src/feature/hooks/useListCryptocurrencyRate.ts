import { useQuery } from "react-query";
import {
  CryptocurrencyRateList,
  listCryptocurrencyRate,
} from "../../apiClients/gmo";
import { useState } from "react";

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
  const [resultCodeOfList, setResultCodeOfList] = useState({ code: "" });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["useCryptocurrencyRate"],
    queryFn: () => listCryptocurrencyRate(),
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
    onError: () => {
      setResultCodeOfList({ code: "systemErro" });
    },
  });

  return {
    cryptocurrencyRateList: data,
    isVirtualCurrencyLoading: isLoading,
    isVirtualCurrencyError: isError,
    resultCodeOfList,
  };
};
