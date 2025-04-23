import { useState } from "react";
import { useMutation } from "react-query";
import { updateGmo, createGmo, Request } from "../../../apiClients/gmo";

export const useSaveGmoSetting = () => {
  const [resultMessage, setResultMessage] = useState("");

  const {
    mutate: saveSetting,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(
    async (gmoSetting: Request) => {
      if (gmoSetting.id) {
        return await updateGmo(gmoSetting);
      } else {
        return await createGmo(gmoSetting);
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
    saveSetting,
    resultMessage,
    isLoading,
    isError,
    isSuccess,
  };
};
