import axios from "axios";
export type RequestSetting = {
  id: number;
  apiKey: string;
  secretKey: string;
};

export const getGmoSetting = async () => {
  const response = await axios.get(
    `http://localhost:3001/api/gmoSetting?id=${1}`
  );
  return response.data;
};

export const createGmoSetting = async (gmoSetting: RequestSetting) => {
  const response = await axios.post("http://localhost:3001/api/GmoSetting", {
    ...gmoSetting,
  });
  return response.data;
};

export const updateGmoSetting = async (gmoSetting: RequestSetting) => {
  const response = await axios.put("http://localhost:3001/api/GmoSetting", {
    ...gmoSetting,
  });
  return response.data;
};

export const listVirtualCurrencyRate = async () => {
  const response = await axios.get(
    `http://localhost:3001/api/virtualCurrencyRateList`
  );
  return response.data;
};
