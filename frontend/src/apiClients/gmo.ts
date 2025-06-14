import axios from "axios";

export const findGmoAccount = async (): Promise<
  | {
      id: number;
      apiKey: string;
      secretKey: string;
    }
  | undefined
> => {
  const response = await axios.get(`http://localhost:3001/api/gmoAccount`);
  return response.data;
};

export const createGmoAccount = async (request: {
  apiKey: string;
  secretKey: string;
}) => {
  const response = await axios.post("http://localhost:3001/api/gmoAccount", {
    ...request,
  });
  return response.data;
};

export const updateGmoAccount = async (request: {
  id: number;
  apiKey: string;
  secretKey: string;
}) => {
  const response = await axios.put("http://localhost:3001/api/gmoAccount", {
    ...request,
  });
  return response.data;
};

export const listCryptocurrencyRate = async (): Promise<{
  status: string;
  rateList: {
    symbol: string;
    last: number;
    bid: number;
    ask: number;
    high: number;
    low: number;
    volume: number;
    timestamp: Date;
  }[];
}> => {
  const response = await axios.get(
    `http://localhost:3001/api/cryptocurrencyRateList`
  );
  return response.data;
};
