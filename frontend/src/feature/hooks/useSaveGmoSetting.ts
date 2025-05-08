import { useState } from "react";
import { useMutation } from "react-query";
import { updateGmo, createGmo, Request } from "../../apiClients/gmo";

export const useSaveGmoSetting = () => {
  const [gmoSettingSaveStatus, setGmoSettingSaveStatus] = useState<string>();
  const { mutate } = useMutation(
    async (gmoSetting: Request) => {
      if (gmoSetting.id) {
        return await updateGmo(gmoSetting);
      } else {
        return await createGmo(gmoSetting);
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
