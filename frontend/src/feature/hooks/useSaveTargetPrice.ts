import { useMutation } from "react-query";
import {
  createSettings,
  TargetPrice,
  updateSettings,
} from "../../apiClients/targetPrice";
import { useState } from "react";

export const useSaveTargetPrice = () => {
  const [resultMessage, setResultMessage] = useState("");

  const {
    mutate: saveSettings,
    isLoading,
    isError,
  } = useMutation(
    async (targetPrice: TargetPrice) => {
      try {
        if (targetPrice.id) {
          await updateSettings(targetPrice);
        }
        await createSettings(targetPrice);
        return { message: "保存が成功しました。" };
      } catch {
        return { message: "保存が失敗しました。" };
      }
    },
    {
      onSuccess: (data) => {
        setResultMessage(data.message);
      },
      onError: () => {
        setResultMessage("保存に失敗しました。");
      },
    }
  );

  return {
    saveSettings,
    resultMessage,
    isLoading,
    isError,
  };
};
