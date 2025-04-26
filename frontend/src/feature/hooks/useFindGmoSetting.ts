import { useQuery } from "react-query";
import { findGmo } from "../../apiClients/gmo";
import { useState } from "react";

export const useGmoSetting = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["gmo"],
    queryFn: () => findGmo(),
    onError: () => {
      setErrorMessage("システムエラーが発生しました。");
    },
  });
  return { data, isError, isLoading, errorMessage };
};
