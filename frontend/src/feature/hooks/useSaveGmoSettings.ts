import { useState } from "react";
import { useMutation } from "react-query";
import {
  updateGmoSetting,
  createGmoSetting,
  RequestSetting,
} from "../../apiClients/gmo";

export const useSaveGmoSettings = () => {
  const [resultMessage, setResultMessage] = useState("");

  const {
    mutate: saveSettings,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(
    async (notificationSetting: RequestSetting) => {
      if (notificationSetting.id) {
        return await updateGmoSetting(notificationSetting);
      } else {
        return await createGmoSetting(notificationSetting);
      }
    },
    {
      onSuccess: () => {
        setResultMessage("設定が保存されました。");
      },
      onError: () => {
        setResultMessage("設定の保存が失敗しました。");
      },
    }
  );

  return {
    saveSettings,
    resultMessage,
    isLoading,
    isError,
    isSuccess,
  };
};
