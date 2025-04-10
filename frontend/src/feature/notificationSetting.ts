import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { VIRTUAL_CURRENCIES } from "./constants";
import { notificationSettingSchema } from "./notificationSettingSchema";

export type Setting = {
  id: number | null;
  virtualCurrencyType: string;
  targetPrice: number;
  lineToken: string;
  userId: string;
};

export const fetchVirtualCurrency = async (
  virtualCurrency = VIRTUAL_CURRENCIES.BTC_JPY
) => {
  const response = await axios.get(
    `http://localhost:3001/api/virtualCurrency?virtualCurrency=${virtualCurrency}`
  );

  return response.data;
};

export const findNotificationSetting = async () => {
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

export const validateAndSaveSettings = async (notificationSetting: any) => {
  const validationResult =
    notificationSettingSchema.safeParse(notificationSetting);

  if (!validationResult.success) {
    const validationErrors: Record<string, string> = {};
    validationResult.error.errors.forEach((err) => {
      validationErrors[err.path[0]] = err.message;
    });
    return {
      success: false,
      validationErrors,
      message: "設定への保存が失敗しました。",
    };
  }

  try {
    await saveSettings(validationResult.data);
    return { success: true, message: "設定が保存されました。" };
  } catch (error: any) {
    return { success: false, message: "設定への保存が失敗しました。" };
  }
};

export const saveSettings = async (displaySetting: Setting) => {
  if (displaySetting.id) {
    await updateSettings(displaySetting);
  } else {
    await createSettings(displaySetting);
  }
};
