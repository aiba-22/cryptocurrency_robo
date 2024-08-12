import React, { useState, useEffect } from 'react';
import axios from 'axios';

// LINE Notifyに通知を送信する関数
async function sendLineNotification(message, token) {
  try {
    await axios.post(
      'http://localhost:3001/api/line',
      `message=${encodeURIComponent(message)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

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

function Page02() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pair, setPair] = useState('btc_jpy');
  const [threshold, setThreshold] = useState(''); // 下限価格の状態を管理するステートを追加
  const [status, setStatus] = useState(''); // 判定結果を表示するためのステート

  const lineToken = 'YOUR_LINE_NOTIFY_TOKEN'; // ここにLINE Notifyのトークンを設定

  const pairs = [
    'btc_jpy', 'etc_jpy', 'lsk_jpy', 'mona_jpy', 'plt_jpy',
    'fnct_jpy', 'dai_jpy', 'wbtc_jpy', 'bril_jpy'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchCoincheckStatus(pair);
        setData(result);
        setLoading(false);

        // 下限価格が設定されている場合に価格をチェック
        if (threshold && result && result.last) {
          if (result.last <= parseFloat(threshold)) {
            setStatus('条件一致: 現在の価格は下限に達しています。');
          } else {
            setStatus('条件不一致: 現在の価格は下限より高いです。');
          }
        } else {
          setStatus(''); // 判定をクリア
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [pair, threshold]); // thresholdを依存配列に追加して、変更時に判定を再実行

  const handleChangePair = (event) => {
    setPair(event.target.value);
  };

  const handleThresholdChange = (event) => {
    setThreshold(event.target.value);
  };

  const handleSendNotification = async () => {
    if (data && data.last <= parseFloat(threshold)) {
      const message = `現在の価格は下限に達しました: ${data.last}`;
      await sendLineNotification(message, lineToken);
      alert('通知が送信されました。');
    } else {
      alert('現在の価格は下限に達していません。');
    }
  };

  return (
    <div>
      <h1>Page02</h1>
      <select value={pair} onChange={handleChangePair}>
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
            value={threshold} 
            onChange={handleThresholdChange} 
            placeholder="例: 5000000" 
          />
        </label>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
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
      {status && <div>{status}</div>} {/* 判定結果を表示 */}
      <button onClick={handleSendNotification}>LINEに通知を送信</button> {/* 通知送信ボタン */}
    </div>
  );
}

export default Page02;
