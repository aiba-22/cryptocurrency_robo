import { useQuery } from "react-query";
import { useState } from "react";
import { fetchPriceAlert } from "../../apiClients/priceAlert";
import { fetchLine } from "../../apiClients/line";

export const usePriceAlertSettings = () => {
  const [errorMessage, setErrorMessage] = useState("");

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
