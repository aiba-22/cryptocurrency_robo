export const PRICE_ALERT_SETTING_SAVE_MESSAGES = {
  success: "保存に成功しました。",
  error: "保存に失敗しました。",
  systemError: "システムエラー",
} as const;

export type PriceAlertSettingSaveStatus =
  keyof typeof PRICE_ALERT_SETTING_SAVE_MESSAGES;

export const isPriceAlertSettingSaveStatus = (
  status: string
): status is PriceAlertSettingSaveStatus => {
  return status in PRICE_ALERT_SETTING_SAVE_MESSAGES;
};

export const SYSTEM_ERROR = "システムエラー";
