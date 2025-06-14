import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { sendLineNotification } from "../../../apiClients/line";

export const useLineNotification = () => {
  const [notificationSendStatus, setNotificationSendStatus] =
    useState<string>();

  const mutation = useMutation({
    mutationFn: sendLineNotification,
    onSuccess: (data) => {
      if (data.status) {
        setNotificationSendStatus(data.status);
      } else {
        setNotificationSendStatus("systemError");
      }
    },
    onError: () => {
      setNotificationSendStatus("systemError");
    },
  });

  return {
    sendNotification: mutation.mutate,
    notificationSendStatus,
    setNotificationSendStatus,
  };
};
