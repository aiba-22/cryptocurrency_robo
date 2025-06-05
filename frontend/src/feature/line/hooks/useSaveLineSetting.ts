import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createLine, updateLine } from "../../../apiClients/line";

type LineSetting = {
  id?: number;
  channelAccessToken: string;
  lineUserId: string;
};

export const useSaveLineSetting = () => {
  const [lineSettingSaveStatus, setAlertSettingSaveStatus] = useState<string>();
  const { mutate } = useMutation({
    mutationFn: async (lineSetting: LineSetting) => {
      const { id, channelAccessToken, lineUserId } = lineSetting;

      if (id) {
        return await updateLine({ id, channelAccessToken, lineUserId });
      } else {
        return await createLine({ channelAccessToken, lineUserId });
      }
    },
    onSuccess: () => {
      setAlertSettingSaveStatus("success");
    },
    onError: () => {
      setAlertSettingSaveStatus("save.systemError");
    },
  });

  return {
    saveLineSettings: mutate,
    lineSettingSaveStatus,
    setAlertSettingSaveStatus,
  };
};
