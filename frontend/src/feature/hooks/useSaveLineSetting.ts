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
  const { mutate, status } = useMutation(async (params: SaveLineParams) => {
    const { id, channelAccessToken, lineUserId } = params;

    if (id) {
      await updateLine({ id, channelAccessToken, lineUserId });
    } else {
      await createLine({ channelAccessToken, lineUserId });
    }
  });

  return {
    saveLineSettings: mutate,
    lineSettingSaveStatus: status,
  };
};
