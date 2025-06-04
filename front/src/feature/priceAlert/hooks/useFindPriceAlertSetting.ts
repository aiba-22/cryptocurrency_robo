import { useQuery } from "@tanstack/react-query";
import { findPriceAlert } from "../../../apiClients/priceAlert";

export const useFindPriceAlertSetting = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["findPriceAlertSetting"],
    queryFn: findPriceAlert,
    select: (priceAlertSetting) => {
      if (!priceAlertSetting) {
        return;
      }
      const { id, conditions } = priceAlertSetting;
      return { id, ...conditions };
    },
  });

  return {
    alertSetting: data,
    isAlertSettingFindError: isError,
    isAlertSettingFindLoading: isLoading,
  };
};
