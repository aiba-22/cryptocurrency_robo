import { useState } from "react";
import { useMutation } from "react-query";
import { updateGmo, createGmo, Request } from "../../apiClients/gmo";

export const useSaveGmoSetting = () => {
  const [resultCodeOfSave, setResultCodeOfSave] = useState({ code: "" });

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
        setResultCodeOfSave({ code: "successSaveGmoSetting" });
      },
      onError: () => {
        setResultCodeOfSave({ code: "errorSaveGmoSetting" });
      },
    }
  );

  return {
    saveSetting,
    resultCodeOfSave,
    isLoading,
    isError,
    isSuccess,
  };
};
