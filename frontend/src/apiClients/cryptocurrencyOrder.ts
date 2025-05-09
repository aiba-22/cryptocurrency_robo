import axios from "axios";
import { number } from "zod";
export type Request = {
  id?: number;
  symbol: string;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
};

type Response = {
  id: number;
  symbol: string;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
};
export const listCryptocurrencyOrder = async (): Promise<Response[]> => {
  const response = await axios.get(
    `http://localhost:3001/api/cryptocurrencyOrder/list`
  );
  return response.data;
};

export const createCryptocurrencyOrder = async (request: Request) => {
  const response = await axios.post(
    "http://localhost:3001/api/cryptocurrencyOrder",
    request
  );
  return response.data;
};

export const updateCryptocurrencyOrder = async (request: Request) => {
  const response = await axios.put(
    "http://localhost:3001/api/cryptocurrencyOrder",
    request
  );
  return response.data;
};
