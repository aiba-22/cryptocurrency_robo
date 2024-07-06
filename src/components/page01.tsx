import React, { useState, useEffect } from 'react';
import axios from 'axios';

// APIリクエストを送信してレスポンスを処理する関数
async function fetchCoincheckTicker() {
  try {
    const response = await axios.get('https://coincheck.com/api/ticker');
    alert(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

function Page01() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 非同期関数を呼び出してデータを取得
    fetchCoincheckTicker()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
  }
alert(data)
  return (
    <div>
      <h1>Page01</h1>
      {data && (
        <div>
          <p>Last: {data}</p>
          {/* 必要に応じて他のデータも表示 */}
        </div>
      )}
    </div>
  );
}

export default Page01;
