import axios from "axios";

export const findCryptocurrencyAdjustmentOrder = async (): Promise<{
  id?: number;
  symbol: string;
  basePrice: number;
  priceAdjustmentRate: number;
  volumeAdjustmentRate: number;
  isEnabled: number;
}> => {
  const response = await axios.get(
    `http://localhost:3001/api/cryptocurrencyAdjustmentOrder`
  );
  return response.data;
};

export const createCryptocurrencyAdjustmentOrder = async (request: {
  symbol: string;
  basePrice: number;
  priceAdjustmentRate: number;
  volumeAdjustmentRate: number;
  isEnabled: number;
}) => {
  const response = await axios.post(
    "http://localhost:3001/api/cryptocurrencyAdjustmentOrder",
    request
  );
  return response.data;
};

export const updateCryptocurrencyAdjustmentOrder = async (request: {
  id: number;
  symbol: string;
  basePrice: number;
  priceAdjustmentRate: number;
  volumeAdjustmentRate: number;
  isEnabled: number;
}) => {
  const response = await axios.put(
    "http://localhost:3001/api/cryptocurrencyAdjustmentOrder",
    request
  );
  return response.data;
};
