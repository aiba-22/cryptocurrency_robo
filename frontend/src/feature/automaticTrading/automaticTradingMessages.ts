export const AUTOMATIC_TRADING_MESSAGES = {
  successSave: "保存に成功しました。",
  systemError: "システムエラー",
} as const;

export type AutomaticTradingStatus = keyof typeof AUTOMATIC_TRADING_MESSAGES;
export const SYSTEM_ERROR = "システムエラー";

export const isAutomaticTradingStatus = (
  status: string
): status is AutomaticTradingStatus => {
  return status in AUTOMATIC_TRADING_MESSAGES;
};
