import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export type Setting = {
  id: number | null;
  virtualCurrencyType: string;
  targetPrice: number;
  lineToken: string;
};

export const fetchCoincheckStatus = async (pair = "btc_jpy") => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/virtualCurrency?pair=${pair}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchSettings = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/notificationSetting?id=${1}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};

export const hundleLineNotificationTestButton = async ({
  setInfomation,
  price,
}: {
  setInfomation: Dispatch<SetStateAction<string>>;
  price?: number;
}) => {
  if (price) {
    try {
      const result = await axios.post<string>(
        "http://localhost:3001/api/line",
        {
          id: 1,
          price: price,
        }
      );
      if (result.data === "success") {
        setInfomation("成功しました。");
      } else if (result.data === "failure") {
        setInfomation("失敗しました。");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }
};

const createSettings = async (displaySetting: Setting) => {
  try {
    await axios.post("http://localhost:3001/api/notificationSetting/create", {
      ...displaySetting,
      id: 1,
    });
  } catch (error) {
    console.error("Error saving settings:", error);
  }
};

const updateSettings = async (displaySetting: Setting) => {
  try {
    await axios.put("http://localhost:3001/api/notificationSetting/update", {
      ...displaySetting,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
  }
};

export const saveSettings = async ({
  displaySetting,
}: {
  displaySetting: Setting;
}) => {
  if (displaySetting.id) {
    await updateSettings(displaySetting);
  } else {
    await createSettings(displaySetting);
  }
};
