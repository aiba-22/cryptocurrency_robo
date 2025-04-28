import { useQuery } from "react-query";
import { useState } from "react";
import { fetchPriceAlert } from "../../apiClients/priceAlert";
import { fetchLine } from "../../apiClients/line";

export const useFindPriceAlertSetting = () => {
  const [resultCodeOfFind, setResultCodeOfFind] = useState({ code: "" });

  const findNotificationSetting = async () => {
    const { id, conditions } = await fetchPriceAlert();
    const { lineToken, userId } = await fetchLine();
    const response = {
      id,
      lineToken,
      userId,
      ...conditions,
    };
    return response;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["findNotificationSetting"],
    queryFn: findNotificationSetting,
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
