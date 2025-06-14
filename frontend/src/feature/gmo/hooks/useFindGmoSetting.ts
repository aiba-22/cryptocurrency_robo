import { useQuery } from "@tanstack/react-query";
import { findGmoAccount } from "../../../apiClients/gmo";

export const useFindGmoSetting = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["gmo"],
    queryFn: () => findGmoAccount(),
  });
  return {
    gmoSetting: data,
    isGmoSettingFindError: isError,
    isGmoSettingFindLoading: isLoading,
  };
};
