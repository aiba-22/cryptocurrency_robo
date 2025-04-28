import { useQuery } from "react-query";
import { findGmo } from "../../apiClients/gmo";
import { useState } from "react";

export const useFindGmoSetting = () => {
  const [resultCodeOfFind, setResultCodeOfFind] = useState({ code: "" });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["gmo"],
    queryFn: () => findGmo(),
    onError: () => {
      setResultCodeOfFind({ code: "systemError" });
    },
  });
  return { data, isError, isLoading, resultCodeOfFind };
};
