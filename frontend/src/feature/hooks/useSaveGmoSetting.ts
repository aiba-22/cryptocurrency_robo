import { useState } from "react";
import { useMutation } from "react-query";
import { updateGmo, createGmo, Request } from "../../apiClients/gmo";

export const useSaveGmoSetting = () => {
  const { mutate, status } = useMutation(async (gmoSetting: Request) => {
    if (gmoSetting.id) {
      return await updateGmo(gmoSetting);
    } else {
      return await createGmo(gmoSetting);
    }
  });

  return {
    saveGmoSetting: mutate,
    gmoSettingSaveStatus: status,
  };
};
