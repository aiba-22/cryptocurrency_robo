import axios from "axios";

export const findGmo = async (): Promise<
  | {
      id: number;
      apiKey: string;
      secretKey: string;
    }
  | undefined
> => {
  const response = await axios.get(`http://localhost:3001/api/gmo`);
  return response.data;
};

export const createGmo = async (request: {
  apiKey: string;
  secretKey: string;
}) => {
  const response = await axios.post("http://localhost:3001/api/gmo", {
    ...request,
  });
  return response.data;
};

export const updateGmo = async (request: {
  id: number;
  apiKey: string;
  secretKey: string;
}) => {
  const response = await axios.put("http://localhost:3001/api/gmo", {
    ...request,
  });
  return response.data;
};

export const listCryptocurrencyRate = async (): Promise<
  {
    symbol: string;
    last: number;
    bid: number;
    ask: number;
    high: number;
    low: number;
    volume: number;
    timestamp: Date;
  }[]
> => {
  const response = await axios.get(
    `http://localhost:3001/api/virtualCurrencyRateList`
  );
  return response.data;
};
