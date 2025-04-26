import { sendLineNotification } from "../../apiClients/line";
import { useState } from "react";
import { useMutation } from "react-query";

export const useLineNotification = () => {
  const [notificationResultCode, setNotificationResultCode] = useState({
    status: "",
  });

  const {
    mutate: sendNotification,
    isLoading,
    isError,
  } = useMutation(sendLineNotification, {
    onSuccess: (data) => {
      if (data === "success") {
        setNotificationResultCode({ status: "successLineNotification" });
      } else {
        setNotificationResultCode({ status: "errorLineNotification" });
      }
    },
    onError: () => {
      setNotificationResultCode({ status: "errorLineNotification" });
    },
  });

  return {
    sendNotification,
    notificationResultCode,
    isLoading,
    isError,
  };
};
