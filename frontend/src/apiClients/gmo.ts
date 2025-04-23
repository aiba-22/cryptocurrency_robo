import axios from "axios";
export type Request = {
  id: number;
  apiKey: string;
  secretKey: string;
};

export const fetchGmo = async () => {
  const response = await axios.get(`http://localhost:3001/api/gmo?id=${1}`);
  return response.data;
};

export const createGmo = async (request: Request) => {
  const response = await axios.post("http://localhost:3001/api/Gmo", {
    ...request,
  });
  return response.data;
};

export const updateGmo = async (request: Request) => {
  const response = await axios.put("http://localhost:3001/api/Gmo", {
    ...request,
  });
  return response.data;
};

export const listVirtualCurrencyRate = async () => {
  const response = await axios.get(
    `http://localhost:3001/api/virtualCurrencyRateList`
  );
  return response.data;
};
