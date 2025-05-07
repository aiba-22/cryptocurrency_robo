import { useMutation } from "react-query";
import {} from "../../apiClients/priceAlert";
import { createLine, updateLine } from "../../apiClients/line";
import { useState } from "react";

type SaveLineParams = {
  id?: number;
  channelAccessToken: string;
  userId: string;
};

export const useSaveLineSetting = () => {
  const { mutate, status } = useMutation(async (params: SaveLineParams) => {
    const { id, channelAccessToken, userId } = params;

    if (id) {
      await updateLine({ id, channelAccessToken, userId });
    } else {
      await createLine({ channelAccessToken, userId });
    }
  });

  return {
    saveLineSettings: mutate,
    lineSettingSaveStatus: status,
  };
};
