import { ORDER_SIDE } from "./constants";

type Rate = {
  ask: string;
  bid: string;
  symbol: string;
};

type Asset = {
  amount: number;
  available: number;
  conversionRate: number;
  symbol: string;
};

type OrderConditions = {
  id: number;
  symbol: string;
  basePrice: number;
  isEnabled: number;
  buyPriceAdjustmentRate: number;
  buyVolumeAdjustmentRate: number;
  sellPriceAdjustmentRate: number;
  sellVolumeAdjustmentRate: number;
};

type StaticConditions = {
  id: number;
  symbol: string;
  targetPrice: number;
  volume: number;
  type: number;
  isEnabled: number;
};

type Order = {
  symbol: string;
  side: string;
  price: number;
  size: number;
};

export class OrderBuilderService {
  buildAdjustmentSellOrder({
    orderConditions,
    rateList,
    assets,
  }: {
    orderConditions: OrderConditions;
    rateList: Rate[];
    assets: Asset[];
  }): Order | undefined {
    if (!this.isConditionEnabled(orderConditions)) return;

    const rateMap = this.mapRateBySymbol(rateList);
    const assetMap = this.mapAvailableBySymbol(assets);

    const rate = rateMap.get(orderConditions.symbol);
    const available = assetMap.get(orderConditions.symbol) ?? 0;

    const targetPrice =
      orderConditions.basePrice * (1 - orderConditions.sellPriceAdjustmentRate);

    if (!rate || rate.bid <= targetPrice || available <= 0) return;

    const volume = orderConditions.sellVolumeAdjustmentRate * available;
    if (volume <= 0) return;

    return this.createOrder(
      orderConditions.symbol,
      ORDER_SIDE.SELL,
      rate.bid,
      volume
    );
  }

  buildAdjustmentBuyOrder({
    orderConditions,
    rateList,
    assets,
  }: {
    orderConditions: OrderConditions;
    rateList: Rate[];
    assets: Asset[];
  }): Order | undefined {
    if (!this.isConditionEnabled(orderConditions)) return;

    const rateMap = this.mapRateBySymbol(rateList);
    const assetMap = this.mapAvailableBySymbol(assets);

    const rate = rateMap.get(orderConditions.symbol);
    const availableJPY = assetMap.get("JPY") ?? 0;

    const targetPrice =
      orderConditions.basePrice * (1 + orderConditions.buyPriceAdjustmentRate);

    if (!rate || rate.ask >= targetPrice || availableJPY <= 0) return;

    const buyAmount = orderConditions.buyVolumeAdjustmentRate * availableJPY;
    if (buyAmount <= 0) return;

    const size = buyAmount / rate.ask;

    return this.createOrder(
      orderConditions.symbol,
      ORDER_SIDE.BUY,
      rate.ask,
      size
    );
  }

  buildStaticBuyOrder({
    conditions,
    rateList,
    assets,
  }: {
    conditions?: StaticConditions;
    rateList: Rate[];
    assets: Asset[];
  }): Order | undefined {
    if (this.isConditionEnabled(conditions) === false) return;

    const rateMap = this.mapRateBySymbol(rateList);
    const assetMap = this.mapAvailableBySymbol(assets);

    const rate = rateMap.get(conditions.symbol);
    const availableJPY = assetMap.get("JPY") ?? 0;

    if (!rate || rate.ask >= conditions.targetPrice) return;

    const totalAmount = conditions.volume * conditions.targetPrice;
    if (totalAmount > availableJPY) return;

    return this.createOrder(
      conditions.symbol,
      ORDER_SIDE.BUY,
      rate.ask,
      conditions.volume
    );
  }

  buildStaticSellOrder({
    conditions,
    rateList,
    assets,
  }: {
    conditions?: StaticConditions;
    rateList: Rate[];
    assets: Asset[];
  }): Order | undefined {
    if (!this.isConditionEnabled(conditions)) return;

    const rateMap = this.mapRateBySymbol(rateList);
    const assetMap = this.mapAvailableBySymbol(assets);

    const rate = rateMap.get(conditions.symbol);
    const available = assetMap.get(conditions.symbol) ?? 0;

    if (
      !rate ||
      rate.bid <= conditions.targetPrice ||
      conditions.volume > available
    )
      return;

    return this.createOrder(
      conditions.symbol,
      ORDER_SIDE.SELL,
      rate.bid,
      conditions.volume
    );
  }

  private isConditionEnabled(conditions?: {
    isEnabled: number;
  }): conditions is { isEnabled: number } {
    if (!conditions || conditions.isEnabled === 1) return false;
    return true;
  }

  private createOrder(
    symbol: string,
    side: string,
    price: number,
    size: number
  ): Order {
    return {
      symbol,
      side,
      price: parseFloat(price.toFixed(3)),
      size: Math.round(size),
    };
  }

  private mapRateBySymbol(
    rateList: Rate[]
  ): Map<string, { ask: number; bid: number }> {
    return new Map(
      rateList.map((rate) => [
        rate.symbol,
        {
          ask: parseFloat(rate.ask),
          bid: parseFloat(rate.bid),
        },
      ])
    );
  }

  private mapAvailableBySymbol(assets: Asset[]): Map<string, number> {
    return new Map(assets.map((asset) => [asset.symbol, asset.available]));
  }
}
