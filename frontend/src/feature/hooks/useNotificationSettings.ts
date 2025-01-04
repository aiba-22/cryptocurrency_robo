import { useQuery } from "react-query";
import {
  fetchVirtualCurrency,
  findNotificationSetting,
} from "..//notificationSetting";

export const useVirtualCurrencyList = (virtualCurrencyType: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["virtualCurrency", virtualCurrencyType],
    queryFn: () => fetchVirtualCurrency(virtualCurrencyType),
    keepPreviousData: true,
  });

  return {
    virtualCurrencyTradingPrice: data,
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
