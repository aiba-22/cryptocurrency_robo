import { useMutation } from "react-query";
import {} from "../../apiClients/priceAlert";
import { createLine, updateLine } from "../../apiClients/line";
import { useState } from "react";

type SaveLineParams = {
  id?: number;
  lineToken: string;
  userId: string;
};

export const useSaveLineSetting = () => {
  const [resultCodeOfSave, setResultCodeOfSave] = useState({ code: "" });

  const { mutate: saveSettings, isLoading } = useMutation(
    async (params: SaveLineParams) => {
      const { id, lineToken, userId } = params;

      if (id) {
        await updateLine({ id, lineToken, userId });
      } else {
        await createLine({ lineToken, userId });
      }
    },
    {
      onSuccess: () => {
        setResultCodeOfSave({ code: "successSaveTargetPriceSetting" });
      },
      onError: () => {
        setResultCodeOfSave({ code: "errorSaveTargetPriceSetting" });
      },
    }
  );

  return {
    saveSettings,
    resultCodeOfSave,
    isLoading,
  };
};
