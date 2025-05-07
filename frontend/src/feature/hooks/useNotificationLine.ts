import { sendLineNotification } from "../../apiClients/line";
import { useState } from "react";
import { useMutation } from "react-query";

export const useLineNotification = () => {
  const [notificationSendStatus, setNotificationSendStatus] =
    useState<string>();
  const { mutate } = useMutation(sendLineNotification, {
    onSuccess: (data) => {
      setNotificationSendStatus(data);
    },
    onError: () => {
      setNotificationSendStatus("systemError");
    },
  });

  return {
    sendNotification: mutate,
    notificationSendStatus,
  };
};
