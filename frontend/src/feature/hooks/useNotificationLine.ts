import { sendLineNotification } from "../../apiClients/line";
import { useState } from "react";
import { useMutation } from "react-query";

export const useLineNotification = () => {
  const [resultCodeOfNotification, setResultCodeOfNotification] = useState({
    code: "",
  });

  const {
    mutate: sendNotification,
    isLoading,
    isError,
  } = useMutation(sendLineNotification, {
    onSuccess: (data) => {
      if (data === "success") {
        setResultCodeOfNotification({ code: "successLineNotification" });
      } else {
        setResultCodeOfNotification({ code: "errorLineNotification" });
      }
    },
    onError: () => {
      setResultCodeOfNotification({ code: "errorLineNotification" });
    },
  });

  return {
    sendNotification,
    resultCodeOfNotification,
    isLoading,
    isError,
  };
};
