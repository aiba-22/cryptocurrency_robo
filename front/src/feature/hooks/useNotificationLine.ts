import { useMutation } from "@tanstack/react-query";
import { sendLineNotification } from "../../apiClients/line";
import { useState } from "react";

export const useLineNotification = () => {
  const [notificationSendStatus, setNotificationSendStatus] =
    useState<string>();

  const mutation = useMutation({
    mutationFn: sendLineNotification,
    onSuccess: (data) => {
      setNotificationSendStatus(data);
    },
    onError: () => {
      setNotificationSendStatus("systemError");
    },
  });

  return {
    sendNotification: mutation.mutate,
    notificationSendStatus,
  };
};
