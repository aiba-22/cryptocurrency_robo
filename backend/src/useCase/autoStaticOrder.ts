import { ORDER_SIDE, ORDER_TYPE } from "../service/constants";
import GmoService from "../service/gmoService";
import GmoApiService from "../service/gmoApiService";
import LineService from "../service/lineService";
import LineApiService from "../service/lineApiService";
import CryptocurrencyStaticOrderService from "../service/cryptocurrencyStaticOrderService";
import { OrderBuilderService } from "../service/orderBuilderService";

export const autoStaticOrder = async () => {
  const gmoService = new GmoService();
  const gmo = await gmoService.find();
  if (!gmo) return;

  const gmoApiService = new GmoApiService(gmo);
  const { rateList } = await gmoApiService.fetchTradingRateList();
  if (!rateList) return;

  const orderService = new CryptocurrencyStaticOrderService();
  const orderConditionList = await orderService.list();
  if (orderConditionList.length === 0) return;

  const assets = await gmoApiService.fetchAssets();
  if (!assets.data) {
    return;
  }

  const buyOrderCondition = orderConditionList.find(
    (order) => order.type === ORDER_TYPE.BUY
  );
  const sellOrderConditions = orderConditionList.find(
    (order) => order.type === ORDER_TYPE.SELL
  );

  const orderBuilderService = new OrderBuilderService();
  const buyOrder = orderBuilderService.buildStaticBuyOrder({
    conditions: buyOrderCondition,
    rateList,
    assets: assets.data,
  });
  const sellOrder = orderBuilderService.buildStaticSellOrder({
    conditions: sellOrderConditions,
    rateList,
    assets: assets.data,
  });

  const order = buyOrder || sellOrder;
  if (!order) return;

  const { symbol, side, price, size } = order;
  await gmoApiService.order({
    symbol,
    side,
    price,
    size,
  });

  const lineService = new LineService();
  const line = await lineService.find();
  if (!line?.channelAccessToken || !line?.lineUserId) return;

  const lineApiService = new LineApiService(line);
  const orderType = side === ORDER_SIDE.BUY ? "買い" : "売り";
  await lineApiService.sendMessage(
    `${order.symbol}の${orderType}注文（${price}円, ${size}枚）が成功しました。`
  );
};
