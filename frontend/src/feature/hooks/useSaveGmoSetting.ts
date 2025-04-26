import { useState } from "react";
import { useMutation } from "react-query";
import { updateGmo, createGmo, Request } from "../../apiClients/gmo";

export const useSaveGmoSetting = () => {
  const [saveGmoSettingResultCode, setSaveGmoSettingResultCode] = useState({
    status: "",
  });

  const {
    mutate: saveSetting,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(
    async (gmoSetting: Request) => {
      if (gmoSetting.id) {
        return await updateGmo(gmoSetting);
      } else {
        return await createGmo(gmoSetting);
      }
    },
    {
      onSuccess: () => {
        setSaveGmoSettingResultCode({ status: "successSaveGmoSetting" });
      },
      onError: () => {
        setSaveGmoSettingResultCode({ status: "errorSaveGmoSetting" });
      },
    }
  );

  return {
    saveSetting,
    saveGmoSettingResultCode,
    isLoading,
    isError,
    isSuccess,
  };
};
