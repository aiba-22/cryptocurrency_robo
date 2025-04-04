import axios from "axios";
import { notificationSettingSchema } from "./notificationSettingSchema";


//useMutationを利用したcreateとupdateを作成

//usefetchを利用した保存状態を取得

export type Setting = {
  id: number | null;
  virtualCurrencyType: string;
  targetPrice: number;
  lineToken: string;
};


const createSettings = async (displaySetting: Setting) => {
  await axios.post("http://localhost:3001/api/gmo/create", {
    ...displaySetting,
    id: 1, // 現状１アカウントしか作成できないので固定にしている
  });
};

const updateSettings = async (displaySetting: Setting) => {
  await axios.put("http://localhost:3001/api/gmo/update", {
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
