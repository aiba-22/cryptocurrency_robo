import axios from "axios";

export type TargetPrice = {
  id?: number;
  virtualCurrencyType: string;
  targetPrice: number;
  lineToken: string;
  userId: string;
};

type Response = {
  id: number;
  virtualCurrencyType: string;
  targetPrice: number;
  lineToken: string;
  userId: string;
};
export const getTargetPrice = async (): Promise<Response> => {
  const response = await axios.get(`http://localhost:3001/api/targetPrice`);
  return response.data;
};

export const createSettings = async (
  targetPrice: TargetPrice
): Promise<void> => {
  await axios.post("http://localhost:3001/api/targetPrice", {
    ...targetPrice,
  });
};

export const updateSettings = async (
  targetPrice: TargetPrice
): Promise<void> => {
  await axios.put("http://localhost:3001/api/targetPrice", {
    ...targetPrice,
  });
};
