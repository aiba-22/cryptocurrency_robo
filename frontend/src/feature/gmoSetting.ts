import axios from "axios";
export type Setting = {
  apiKey: string;
  secretKey: string;
};

export const getSetting = async () => {
  const response = await axios.get(
    `http://localhost:3001/api/gmoSetting?id=${1}`
  );
  return response.data;
};

export const createSettings = async (displaySetting: Setting) => {
  try {
    await axios.post("http://localhost:3001/api/GmoSetting/create", {
      ...displaySetting,
      id: 1,
    });
  } catch {
    alert("dd");
  }
};

export const updateSettings = async (displaySetting: Setting) => {
  await axios.put("http://localhost:3001/api/GmoSetting/update", {
    ...displaySetting,
  });
};
