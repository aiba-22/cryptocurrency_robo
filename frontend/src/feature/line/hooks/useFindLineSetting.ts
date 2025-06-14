import { useQuery } from "@tanstack/react-query";
import { findLineAccount } from "../../../apiClients/line";

export const useFindLineSetting = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["findLineSetting"],
    queryFn: findLineAccount,
  });

  return {
    lineSetting: data,
    isLineSettingFindError: isError,
    isLineSettingFindLoading: isLoading,
  };
};
