export const AUTOMATIC_TRADING_MESSAGES = {
  success: "保存に成功しました。",
  error: "保存に失敗しました。",
  systemError: "システムエラー",
} as const;

export type AutomaticTradingStatus = keyof typeof AUTOMATIC_TRADING_MESSAGES;
export const SYSTEM_ERROR = "システムエラー";

export const isOrderSettingSaveStatus = (
  status: string
): status is AutomaticTradingStatus => {
  return status in AUTOMATIC_TRADING_MESSAGES;
};
