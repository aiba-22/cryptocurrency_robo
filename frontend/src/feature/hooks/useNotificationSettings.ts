import { useQuery } from "react-query";
import { useState } from "react";
import { findNotificationSetting } from "../notificationSetting";

export const useNotificationSetting = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["findNotificationSetting"],
    queryFn: () => findNotificationSetting(),
    onError: () => {
      setErrorMessage("システムエラーが発生しました。");
    },
  });
  return {
    isNotificationError: isError,
    isNotificationLoading: isLoading,
    notificationSetting: data,
    errorMessage,
  };
};
