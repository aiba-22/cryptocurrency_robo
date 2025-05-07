import { useQuery } from "react-query";
import { findPriceAlert } from "../../apiClients/priceAlert";

export const useFindPriceAlertSetting = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["findPriceAlertSetting"],
    queryFn: findPriceAlert,
  });

  return {
    alertSetting: data,
    isAlertSettingFindError: isError,
    isAlertSettingFindLoading: isLoading,
  };
};
