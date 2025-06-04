import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createGmo, updateGmo } from "../../../apiClients/gmo";

type GmoSetting = { id?: number; apiKey: string; secretKey: string };

export const useSaveGmoSetting = () => {
  const [gmoSettingSaveStatus, setGmoSettingSaveStatus] = useState<string>();
  const { mutate } = useMutation({
    mutationFn: async (gmoSetting: GmoSetting) => {
      const { id, apiKey, secretKey } = gmoSetting;
      if (id) {
        return await updateGmo({ id, apiKey, secretKey });
      } else {
        return await createGmo({ apiKey, secretKey });
      }
    },

    onSuccess: () => {
      setGmoSettingSaveStatus("success");
    },
    onError: () => {
      setGmoSettingSaveStatus("systemError");
    },
  });

  return {
    saveGmoSetting: mutate,
    gmoSettingSaveStatus,
  };
};
