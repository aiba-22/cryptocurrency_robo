import { ORDER_SIDE } from "../service/constants";
import GmoService from "../service/gmoService";
import GmoApiService from "../service/gmoApiService";
import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";
import CryptocurrencyAdjustmentOrderService from "../service/cryptocurrencyAdjustmentOrderService";
import { OrderBuilderService } from "../service/orderBuilderService";

export const autoAdjustmentOrder = async () => {
  const gmoService = new GmoService();
  const gmo = await gmoService.find();
  if (!gmo?.apiKey || !gmo?.secretKey) return;

  const gmoApiService = new GmoApiService(gmo);
  const { rateList } = await gmoApiService.fetchTradingRateList();
  if (!rateList) return;

  const orderService = new CryptocurrencyAdjustmentOrderService();
  const orderConditions = await orderService.find();
  if (!orderConditions) return;

  const assets = await gmoApiService.fetchAssets();
  if (assets.status !== "success" || !assets.data) {
    return;
  }

  const orderBuilderService = new OrderBuilderService();
  const adjustmentBuyOrder = orderBuilderService.buildAdjustmentBuyOrder({
    orderConditions,
    rateList,
    assets: assets.data,
  });

  const adjustmentSellOrder = orderBuilderService.buildAdjustmentSellOrder({
    orderConditions,
    rateList,
    assets: assets.data,
  });
  const adjustmentOrder = adjustmentBuyOrder || adjustmentSellOrder;
  if (!adjustmentOrder) return;

  const { symbol, side, price, size } = adjustmentOrder;
  await gmoApiService.order({
    symbol,
    side,
    price,
    size,
  });

  await orderService.update({
    id: orderConditions.id,
    symbol: orderConditions.symbol,
    basePrice: price,
  });

  const lineService = new LineService();
  const line = await lineService.find();
  if (!line?.channelAccessToken || !line?.lineUserId) return;

  const lineApiService = new LineApiService(line);
  const orderType = side === ORDER_SIDE.BUY ? "買い" : "売り";
  await lineApiService.sendMessage(
    `${symbol}の${orderType}注文（${price}円, ${size}枚）を行いました。`
  );
};
