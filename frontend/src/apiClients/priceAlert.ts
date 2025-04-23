import axios from "axios";

export const fetchPriceAlert = async (): Promise<{
  id: number;
  conditions: {
    isUpperLimit: boolean;
    cryptocurrencyType: string;
    price: number;
  };
}> => {
  const response = await axios.get(`http://localhost:3001/api/priceAlert`);
  return response.data;
};

export const createPriceAlert = async (request: {
  isUpperLimit: boolean;
  cryptocurrencyType: string;
  price: number;
}): Promise<void> => {
  const { isUpperLimit, cryptocurrencyType, price } = request;
  await axios.post("http://localhost:3001/api/priceAlert", {
    conditions: { isUpperLimit, cryptocurrencyType, price },
  });
};

export const updatePriceAlert = async (request: {
  id: number;
  isUpperLimit: boolean;
  cryptocurrencyType: string;
  price: number;
}): Promise<void> => {
  const { id, isUpperLimit, cryptocurrencyType, price } = request;
  await axios.put("http://localhost:3001/api/priceAlert", {
    id,
    conditions: { isUpperLimit, cryptocurrencyType, price },
  });
};
