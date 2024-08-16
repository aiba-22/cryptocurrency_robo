import React, { useState, useEffect } from 'react';
import axios from 'axios';



// APIリクエストを送信してレスポンスを処理する関数
async function fetchCoincheckStatus(pair = 'btc_jpy') {
  try {
    const response = await axios.get(`http://localhost:3001/api/ticker?pair=${pair}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// 設定をサーバーに保存する関数
async function saveSettings(displaySetting: Setting) {
  try {
    await axios.post('http://localhost:3001/api/settings/create',  {...displaySetting, id: 1});
    alert('設定が保存されました。');
  } catch (error) {
    console.error('Error saving settings:', error);
    alert('設定の保存に失敗しました。');
  }
}

async function updateSettings(displaySetting: Setting) {
  try {
    await axios.put('http://localhost:3001/api/settings/update', {...displaySetting, id: 1});
    alert('設定が更新されました。');
  } catch (error) {
    console.error('Error updating settings:', error);
    alert('設定の更新に失敗しました。');
  }
}

type TickerData = {
  last: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
};

type Setting = {
  id:number|null,
  virtualCurrencyType: string;
  targetPrice: number;
  lineToken: string;
};

function NotificationSettings() {
  const [data, setData] = useState<TickerData | null>(null);
  const [error, setError] = useState("");
  const [setting, setSetting] = useState<Setting>({ id: null, virtualCurrencyType: "", targetPrice: 0 , lineToken: ""});
  const [displaySetting, setDisplaySetting] = useState<Setting>({ id: null, virtualCurrencyType: "", targetPrice: 0 , lineToken: ""});

  const pairs = [
    'btc_jpy', 'etc_jpy', 'lsk_jpy', 'mona_jpy', 'plt_jpy',
    'fnct_jpy', 'dai_jpy', 'wbtc_jpy', 'bril_jpy'
  ];

  // LINE Notifyに通知を送信する関数
async function sendLineNotification() {
  try {
     await axios.post('http://localhost:3001/api/line', {
      id: 1,
      price: data?.last
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}
  const handleSaveSettings = async () => {
    if (setting.id) {
      // 設定が既に存在する場合は更新
      await updateSettings(displaySetting);
    } else {
      // 設定が存在しない場合は新規作成
      await saveSettings(displaySetting);
    }
  };

  // 設定をデータベースから取得する関数
  async function fetchSettings() {
    try {
      const response = await axios.get(`http://localhost:3001/api/settings?id=${1}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCoincheckStatus(displaySetting.virtualCurrencyType);
        setData(result);
        // 設定をデータベースから取得
        const settings = await fetchSettings();
        if (settings) {
          setSetting({ id: settings.id, virtualCurrencyType: settings.virtualCurrencyType, targetPrice: settings.targetPrice, lineToken: settings.lineToken });
              setDisplaySetting((prevSetting) => ({
      ...prevSetting, targetPrice: settings.targetPrice, lineToken: settings.lineToken }));
        }

      } catch (error) {
        setError("取得に失敗しました。");
      }
    };

    fetchData();
  }, [displaySetting.virtualCurrencyType]); // 最初のマウント時にのみ実行

  const handleTargetPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplaySetting((prevSetting) => ({
      ...prevSetting,
      targetPrice: parseInt(event.target.value, 10),
    }));
  };

  const handleVirtualCurrencyTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplaySetting((prevSetting) => ({
      ...prevSetting,
      virtualCurrencyType: event.target.value,
    }));
  };

  const handleLineTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplaySetting((prevSetting) => ({
      ...prevSetting,
      lineToken: event.target.value,
    }));
  };

  const handleSendNotification = async () => {
    await sendLineNotification();
    alert('通知が送信されました。');
  }

  return (
    <div>
      <h1>通知設定</h1>
      <select value={displaySetting.virtualCurrencyType} onChange={handleVirtualCurrencyTypeChange}>
        {pairs.map((pair) => (
          <option key={pair} value={pair}>
            {pair.toUpperCase()}
          </option>
        ))}
      </select>
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
      </div>
      {error && <div>Error: {error}</div>}
      {data && (
        <div>
          <p>Last: {data.last}</p>
          <p>Bid: {data.bid}</p>
          <p>Ask: {data.ask}</p>
          <p>High: {data.high}</p>
          <p>Low: {data.low}</p>
          <p>Volume: {data.volume}</p>
          <p>Timestamp: {new Date(data.timestamp * 1000).toLocaleString()}</p>
        </div>
      )}
      <button onClick={handleSendNotification}>LINEに通知を送信</button>
      <button onClick={handleSaveSettings}>設定を保存</button>
    </div>
  );
}

export default NotificationSettings;
