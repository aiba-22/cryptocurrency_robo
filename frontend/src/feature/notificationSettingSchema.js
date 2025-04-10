import { z } from "zod";

export const notificationSettingSchema = z.object({
  id: z.union([z.number(), z.null()]),
  virtualCurrencyType: z.string().min(1, "仮想通貨の種類を選択してください"),
  targetPrice: z.number().positive("0以上を指定してください。"),
  lineToken: z.string("LINEトークンを入力してください"),
  userId: z.string("LINEユーザーIDを入力してください"),
});
