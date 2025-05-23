import { useState } from "react";
import { useMutation } from "react-query";
import { updateGmo, createGmo } from "../../apiClients/gmo";

type GmoSetting = { id?: number; apiKey: string; secretKey: string };

export const useSaveGmoSetting = () => {
  const [gmoSettingSaveStatus, setGmoSettingSaveStatus] = useState<string>();
  const { mutate } = useMutation(
    async (gmoSetting: GmoSetting) => {
      const { id, apiKey, secretKey } = gmoSetting;
      if (id) {
        return await updateGmo({ id, apiKey, secretKey });
      } else {
        return await createGmo({ apiKey, secretKey });
      }
    },
    {
      onSuccess: (data) => {
        setGmoSettingSaveStatus(data);
      },
      onError: () => {
        setGmoSettingSaveStatus("systemError");
      },
    }
  );

  return {
    saveGmoSetting: mutate,
    gmoSettingSaveStatus,
  };
};
