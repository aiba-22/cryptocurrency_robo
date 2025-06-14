import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createGmoAccount, updateGmoAccount } from "../../../apiClients/gmo";

type GmoSetting = { id?: number; apiKey: string; secretKey: string };

export const useSaveGmoSetting = () => {
  const [gmoSettingSaveStatus, setGmoSettingSaveStatus] = useState<string>();
  const { mutate } = useMutation({
    mutationFn: async (gmoSetting: GmoSetting) => {
      const { id, apiKey, secretKey } = gmoSetting;
      if (id) {
        return await updateGmoAccount({ id, apiKey, secretKey });
      } else {
        return await createGmoAccount({ apiKey, secretKey });
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
