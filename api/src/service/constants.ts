// アカウント機能をつけるまではuserIdは固定で利用する
// userテーブルを作成したらそこに紐づく取得方法にする
export const USER_ID = 1;

export const CRYPTOCURRENCY = {
  BTC: "BTC",
  ETH: "ETH",
  ETC: "ETC",
  LSK: "LSK",
  XRP: "XRP",
  XEM: "XEM",
  BCH: "BCH",
  MONA: "MONA",
  IOST: "IOST",
  ENJ: "ENJ",
  CHZ: "CHZ",
  IMX: "IMX",
  SHIB: "SHIB",
  AVAX: "AVAX",
  PLT: "PLT",
  FNCT: "FNCT",
  DAI: "DAI",
  WBTC: "WBTC",
  BRIL: "BRIL",
  BC: "BC",
};

export const CRYPTOCURRENCY_LIST = Object.values(CRYPTOCURRENCY);

export const ORDER_TYPE = { BUY: 0, SELL: 1 } as const;
export const ORDER_SIDE = {
  BUY: "BUY",
  SELL: "SELL",
} as const;
