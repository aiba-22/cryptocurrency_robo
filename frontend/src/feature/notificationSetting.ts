import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { VIRTUAL_CURRENCIES } from "./constants";

export type Setting = {
  id: number | null;
  virtualCurrencyType: string;
  targetPrice: number;
  lineToken: string;
};

export const fetchCoincheckStatus = async (
  virtualCurrency = VIRTUAL_CURRENCIES.BTC_JPY
) => {
  const response = await axios.get(
    `http://localhost:3001/api/virtualCurrency?virtualCurrency=${virtualCurrency}`
  );
  return response.data;
};

export const fetchSettings = async () => {
  const response = await axios.get(
    `http://localhost:3001/api/notificationSetting?id=${1}`
  );
  return response.data;
};

export const hundleLineNotificationTestButton = async ({
  setInfomation,
  price,
}: {
  setInfomation: Dispatch<SetStateAction<string>>;
  price?: number;
}) => {
  if (price) {
    const result = await axios.post<string>("http://localhost:3001/api/line", {
      id: 1,
      price: price,
    });
    if (result.data === "success") {
      setInfomation("成功しました。");
    } else if (result.data === "failure") {
      setInfomation("失敗しました。");
    }
  }
};

const createSettings = async (displaySetting: Setting) => {
  await axios.post("http://localhost:3001/api/notificationSetting/create", {
    ...displaySetting,
    id: 1,
  });
};

const updateSettings = async (displaySetting: Setting) => {
  await axios.put("http://localhost:3001/api/notificationSetting/update", {
    ...displaySetting,
  });
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
