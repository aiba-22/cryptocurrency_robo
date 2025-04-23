import { useQuery } from "react-query";
import { fetchGmo } from "../../../apiClients/gmo";
import { useState } from "react";

export const useGmoSetting = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["gmo"],
    queryFn: () => fetchGmo(),
    onError: () => {
      setErrorMessage("システムエラーが発生しました。");
    },
  });
  return { data, isError, isLoading, errorMessage };
};
