import { useQuery } from "react-query";
import {
  fetchVirtualCurrency,
  findNotificationSetting,
} from "..//notificationSetting";

export const useVirtualCurrency = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["virtualCurrency"],
    queryFn: () => fetchVirtualCurrency(),
    keepPreviousData: true,
  });

  return {
    virtualCurrencyTradingPriceList: data,
    isVirtualCurrencyLoading: isLoading,
    isVirtualCurrencyError: isError,
  };
};

export const useNotificationSetting = (onSuccess: (setting: any) => void) => {
  const { isError, isLoading } = useQuery({
    queryKey: ["findNotificationSetting"],
    queryFn: findNotificationSetting,
    onSuccess,
  });
  return {
    isNotificationSettingError: isError,
    isNotificationSettingLoading: isLoading,
  };
};
