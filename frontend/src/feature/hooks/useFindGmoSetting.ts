import { useQuery } from "react-query";
import { findGmo } from "../../apiClients/gmo";

export const useFindGmoSetting = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["gmo"],
    queryFn: () => findGmo(),
  });
  return {
    gmoSetting: data,
    isGmoSettingFindError: isError,
    isGmoSettingFindLoading: isLoading,
  };
};
