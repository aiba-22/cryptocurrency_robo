import { getTargetPrice } from "../apiClients/targetPrice";
import { getLineSetting } from "../apiClients/line";

export const findNotificationSetting = async () => {
  const { id, targetPrice, virtualCurrencyType } = await getTargetPrice();
  const { lineToken, userId } = await getLineSetting();
  const response = {
    id,
    lineToken,
    targetPrice,
    userId,
    virtualCurrencyType,
  };
  return response;
};
