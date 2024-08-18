import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  fetchCoincheckStatus,
  fetchSettings,
  saveSettings,
  hundleLineNotificationTestButton,
  Setting,
} from "../feature/notificationSettings";
import { currencyPairs } from "../feature/enums";
import { settingsSchema } from "../feature/notificationSettingsSchema";

function NotificationSettings() {
  const [infomation, setInfomation] = useState("");
  const [displaySetting, setDisplaySetting] = useState<Setting>({
    id: null,
    virtualCurrencyType: "btc_jpy",
    targetPrice: 0,
    lineToken: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const {
    data: tickerData,
    error: tickerError,
    isLoading: tickerLoading,
  } = useQuery({
    queryKey: ["ticker", displaySetting.virtualCurrencyType],
    queryFn: () => fetchCoincheckStatus(displaySetting.virtualCurrencyType),
    keepPreviousData: true,
  });

  const { error: settingsError, isLoading: settingsLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    onSuccess: (settings) => {
      setDisplaySetting(settings);
    },
  });

  const handleTargetPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplaySetting((prevSetting) => ({
      ...prevSetting,
      targetPrice: parseInt(event.target.value, 10),
    }));
  };

  const handleVirtualCurrencyTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplaySetting((prevSetting) => ({
      ...prevSetting,
      virtualCurrencyType: event.target.value,
    }));
  };

  const handleLineTokenChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplaySetting((prevSetting) => ({
      ...prevSetting,
      lineToken: event.target.value,
    }));
  };

  const handleSettingSaveButton = async () => {
    try {
      const validatedData = settingsSchema.parse(displaySetting);
      await saveSettings({ displaySetting: validatedData });
      setInfomation("設定が保存されました。");
    } catch (error: any) {
      const formattedErrors: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setValidationErrors(formattedErrors);
    }
  };

  return (
    <div>
      <h1>通知設定</h1>
      {settingsLoading || tickerLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <label>
              指定通貨
              <select
                value={displaySetting.virtualCurrencyType}
                onChange={handleVirtualCurrencyTypeChange}
              >
                {currencyPairs.map((pair) => (
                  <option key={pair} value={pair}>
                    {pair.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
            {validationErrors.virtualCurrencyType && (
              <div>{validationErrors.virtualCurrencyType}</div>
            )}
          </div>
          <div>
            <label>
              下限価格
              <input
                type="number"
                value={displaySetting.targetPrice}
                onChange={handleTargetPriceChange}
                placeholder="例: 5000000"
              />
            </label>
            {validationErrors.targetPrice && (
              <div>{validationErrors.targetPrice}</div>
            )}
          </div>
          <div>
            <label>
              LINEトークン
              <input
                type="text"
                value={displaySetting.lineToken}
                onChange={handleLineTokenChange}
              />
            </label>
            {validationErrors.lineToken && (
              <div>{validationErrors.lineToken}</div>
            )}
          </div>
          {(settingsError || tickerError) && (
            <div>システムエラーが発生しました</div>
          )}
          <div>
            <button onClick={() => handleSettingSaveButton()}>
              設定を保存
            </button>
          </div>
          {infomation && <div>{infomation}</div>}
          <div>
            <button
              onClick={() =>
                hundleLineNotificationTestButton({
                  setInfomation,
                  price: tickerData?.last,
                })
              }
            >
              LINEに通知テスト
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationSettings;
