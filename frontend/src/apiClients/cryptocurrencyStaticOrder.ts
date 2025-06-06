import axios from "axios";

export const listCryptocurrencyStaticOrder = async (): Promise<
  {
    id: number;
    symbol: string;
    targetPrice: number;
    volume: number;
    type: number;
    isEnabled: number;
  }[]
> => {
  const response = await axios.get(
    `http://localhost:3001/api/cryptocurrencyStaticOrder/list`
  );
  return response.data;
};

export const createCryptocurrencyStaticOrder = async (request: {
  symbol: string;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
}) => {
  const response = await axios.post(
    "http://localhost:3001/api/cryptocurrencyStaticOrder",
    request
  );
  return response.data;
};

export const updateCryptocurrencyStaticOrder = async (request: {
  id: number;
  symbol: string;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
}) => {
  const response = await axios.put(
    "http://localhost:3001/api/cryptocurrencyStaticOrder",
    request
  );
  return response.data;
};
