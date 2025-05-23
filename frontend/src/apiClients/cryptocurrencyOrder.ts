import axios from "axios";

export const listCryptocurrencyOrder = async (): Promise<
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
    `http://localhost:3001/api/cryptocurrencyOrder/list`
  );
  return response.data;
};

export const createCryptocurrencyOrder = async (request: {
  symbol: string;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
}) => {
  const response = await axios.post(
    "http://localhost:3001/api/cryptocurrencyOrder",
    request
  );
  return response.data;
};

export const updateCryptocurrencyOrder = async (request: {
  id: number;
  symbol: string;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
}) => {
  const response = await axios.put(
    "http://localhost:3001/api/cryptocurrencyOrder",
    request
  );
  return response.data;
};
