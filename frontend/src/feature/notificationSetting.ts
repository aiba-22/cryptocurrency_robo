import { fetchPriceAlert } from "../apiClients/priceAlert";
import { fetchLine } from "../apiClients/line";

export const findNotificationSetting = async () => {
  const { id, conditions } = await fetchPriceAlert();
  const { lineToken, userId } = await fetchLine();
  const response = {
    id,
    lineToken,
    userId,
    ...conditions,
  };
  return response;
};
