import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { settingsSchema } from "./notificationSettingsSchema";

export type Setting = {
  id: number | null;
  virtualCurrencyType: string;
  targetPrice: number;
  lineToken: string;
};

export const fetchCoincheckStatus = async (pair = "btc_jpy") => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/ticker?pair=${pair}`
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
      `http://localhost:3001/api/settings?id=${1}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};

const saveSettings = async (displaySetting: Setting) => {
  try {
    await axios.post("http://localhost:3001/api/settings/create", {
      ...displaySetting,
      id: 1,
    });
    alert("設定が保存されました。");
  } catch (error) {
    console.error("Error saving settings:", error);
    alert("設定の保存に失敗しました。");
  }
};

const updateSettings = async (displaySetting: Setting) => {
  try {
    await axios.put("http://localhost:3001/api/settings/update", {
      ...displaySetting,
      id: 1,
    });
    alert("設定が更新されました。");
  } catch (error) {
    console.error("Error updating settings:", error);
    alert("設定の更新に失敗しました。");
  }
};

export const sendLineNotification = async ({
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

export const handleSaveSettings = async ({
  id,
  displaySetting,
}: {
  id: number | null;
  displaySetting: Setting;
}) => {
  if (id) {
    await updateSettings(displaySetting);
  } else {
    await saveSettings(displaySetting);
  }
};
export const validateForm = (displaySetting: Setting) => {
  try {
    settingsSchema.parse(displaySetting);
    return true;
  } catch (error: any) {
    const formattedErrors: Record<string, string> = {};
    error.errors.forEach((err: any) => {
      formattedErrors[err.path[0]] = err.message;
    });
    return formattedErrors;
  }
};
