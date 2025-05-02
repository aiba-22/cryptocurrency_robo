import { useQuery } from "react-query";
import { useState } from "react";
import { findLine } from "../../apiClients/line";

export const useFindLineSetting = () => {
  const [resultCodeOfFind, setResultCodeOfFind] = useState({ code: "" });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["findLineSetting"],
    queryFn: findLine,
    onError: () => {
      setResultCodeOfFind({ code: "systemError" });
    },
  });

  return {
    isNotificationError: isError,
    isNotificationLoading: isLoading,
    notificationSetting: data,
    resultCodeOfFind,
  };
};
