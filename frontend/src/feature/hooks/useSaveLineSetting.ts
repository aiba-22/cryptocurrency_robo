import { useMutation } from "react-query";
import {} from "../../apiClients/priceAlert";
import { createLine, updateLine } from "../../apiClients/line";
import { useState } from "react";

type SaveLineParams = {
  id?: number;
  channelAccessToken: string;
  lineUserId: string;
};

export const useSaveLineSetting = () => {
  const [lineSettingSaveStatus, setAlertSettingSaveStatus] = useState<string>();
  const { mutate, status } = useMutation(
    async (params: SaveLineParams) => {
      const { id, channelAccessToken, lineUserId } = params;

      if (id) {
        return await updateLine({ id, channelAccessToken, lineUserId });
      } else {
        return await createLine({ channelAccessToken, lineUserId });
      }
    },
    {
      onSuccess: (data) => {
        setAlertSettingSaveStatus(data);
      },
      onError: () => {
        setAlertSettingSaveStatus("systemError");
      },
    }
  );

  return {
    saveLineSettings: mutate,
    lineSettingSaveStatus,
  };
};
