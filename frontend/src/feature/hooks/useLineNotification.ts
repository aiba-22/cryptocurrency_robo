import { sendLineNotification } from "../../apiClients/line";
import { useState } from "react";
import { useMutation } from "react-query";

export const useLineNotification = () => {
  const [resultMessage, setResultMessage] = useState("");

  const {
    mutate: sendNotification,
    isLoading,
    isError,
  } = useMutation(
    async (targetPrice: number) => {
      const result = await sendLineNotification({ id: 1, targetPrice });
      if (result === "success") {
        return { message: "テスト通知が成功しました。" };
      }
      return { message: "テスト通知に失敗しました。" };
    },
    {
      onSuccess: (data) => {
        setResultMessage(data.message);
      },
      onError: () => {
        setResultMessage("通知の送信に失敗しました。");
      },
    }
  );

  return {
    sendNotification,
    resultMessage,
    isLoading,
    isError,
  };
};
