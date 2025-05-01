import axios from "axios";

export const fetchPriceAlert = async (): Promise<{
  id: number;
  conditions: {
    isUpperLimit: boolean;
    symbol: string;
    price: number;
  };
}> => {
  const response = await axios.get(`http://localhost:3001/api/priceAlert`);
  return response.data;
};

export const createPriceAlert = async (request: {
  isUpperLimit: boolean;
  symbol: string;
  price: number;
}): Promise<void> => {
  const { isUpperLimit, symbol, price } = request;
  await axios.post("http://localhost:3001/api/priceAlert", {
    conditions: { isUpperLimit, symbol, price },
  });
};

export const updatePriceAlert = async (request: {
  id: number;
  isUpperLimit: boolean;
  symbol: string;
  price: number;
}): Promise<void> => {
  const { id, isUpperLimit, symbol, price } = request;
  await axios.put("http://localhost:3001/api/priceAlert", {
    id,
    conditions: { isUpperLimit, symbol, price },
  });
};
