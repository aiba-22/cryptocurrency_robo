import React, { useState, useEffect } from "react";
import {
  fetchCoincheckStatus,
  fetchSettings,
  handleSaveSettings,
  sendLineNotification,
  Setting,
} from "../feature/notificationSettings";
import { currencyPairs } from "../feature/enums";
import { settingsSchema } from "../feature/notificationSettingsSchema";

type TickerData = {
  last: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
};

function NotificationSettings() {
  const [data, setData] = useState<TickerData | null>(null);
  const [error, setError] = useState("");
  const [infomation, setInfomation] = useState("");
  const [setting, setSetting] = useState<Setting>({
    id: null,
    virtualCurrencyType: "",
    targetPrice: 0,
    lineToken: "",
  });
  const [displaySetting, setDisplaySetting] = useState<Setting>({
    id: null,
    virtualCurrencyType: "btc_jpy",
    targetPrice: 0,
    lineToken: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCoincheckStatus(
          displaySetting.virtualCurrencyType
        );
        setData(result);

        const settings = await fetchSettings();
        if (settings) {
          setSetting({
            id: settings.id,
            virtualCurrencyType: settings.virtualCurrencyType,
            targetPrice: settings.targetPrice,
            lineToken: settings.lineToken,
          });
          setDisplaySetting((prevSetting) => ({
            ...prevSetting,
            targetPrice: settings.targetPrice,
            lineToken: settings.lineToken,
          }));
        }
      } catch (error) {
        setError("取得に失敗しました。");
      }
    };

    fetchData();
  }, [displaySetting.virtualCurrencyType]);

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

  const validateForm = () => {
    try {
      settingsSchema.parse(displaySetting);
      setValidationErrors({});
      return true;
    } catch (error: any) {
      const formattedErrors: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setValidationErrors(formattedErrors);
      return false;
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      handleSaveSettings({ id: setting.id, displaySetting });
    }
  };

  return (
    <div>
      <h1>通知設定</h1>
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
      {validationErrors.virtualCurrencyType && (
        <div>{validationErrors.virtualCurrencyType}</div>
      )}
      <div>
        <label>
          下限価格を入力してください:
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
          LINEトークンを入力してください:
          <input
            type="text"
            value={displaySetting.lineToken}
            onChange={handleLineTokenChange}
          />
        </label>
        {validationErrors.lineToken && <div>{validationErrors.lineToken}</div>}
      </div>
      {infomation && <div>{infomation}</div>}
      {error && <div>{error}</div>}
      <button
        onClick={() =>
          sendLineNotification({ setInfomation, price: data?.last })
        }
      >
        LINEに通知テスト
      </button>
      <button onClick={handleSave}>設定を保存</button>
    </div>
  );
}

export default NotificationSettings;
