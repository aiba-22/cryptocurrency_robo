export const LINE_NOTIFICATION_MESSAGES = {
  success: "テスト送信に成功しました。",
  tooManyRequests: "メッセージの送信可能件数（月200件）を超過しました。",
  badRequest: "トークン情報が誤っています。",
  systemError: "システムエラー",
} as const;

export type LineNotificationStatus = keyof typeof LINE_NOTIFICATION_MESSAGES;

export const LINE_SETTING_SAVE_MESSAGES = {
  success: "保存に成功しました。",
  error: "保存に失敗しました。",
  systemError: "システムエラー",
} as const;

export type LineSettingSaveStatus = keyof typeof LINE_SETTING_SAVE_MESSAGES;

export const SYSTEM_ERROR = "システムエラー";

export const isNotificationStatus = (
  status: string
): status is LineNotificationStatus => {
  return status in LINE_NOTIFICATION_MESSAGES;
};

export const isLineSettingSaveStatus = (
  status: string
): status is LineSettingSaveStatus => {
  return status in LINE_SETTING_SAVE_MESSAGES;
};
