export const GMO_SETTING_MESSAGES = {
  success: "保存に成功しました。",
  failure: "保存に失敗しました。",
  systemError: "システムエラー",
} as const;

export type GmoSettingStatus = keyof typeof GMO_SETTING_MESSAGES;

export const isGmoSettingStatus = (
  status: string
): status is GmoSettingStatus => {
  return status in GMO_SETTING_MESSAGES;
};
