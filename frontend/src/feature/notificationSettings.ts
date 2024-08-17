import axios from "axios";

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

export const sendLineNotification = async (price?: number) => {
  if (price) {
    try {
      await axios.post("http://localhost:3001/api/line", {
        id: 1,
        price: price,
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }
    alert("通知が送信されました。");
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
