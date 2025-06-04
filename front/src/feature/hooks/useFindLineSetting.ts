import { useQuery } from "@tanstack/react-query";
import { findLine } from "../../apiClients/line";

export const useFindLineSetting = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["findLineSetting"],
    queryFn: findLine,
  });

  return {
    lineSetting: data,
    isLineSettingFindError: isError,
    isLineSettingFindLoading: isLoading,
  };
};
