import React, { useState, useEffect } from 'react';
import axios from 'axios';

// APIリクエストを送信してレスポンスを処理する関数
async function fetchCoincheckStatus(pair = 'etc_jpy') {
  try {
    const response = await axios.get(`http://localhost:3001/api/ticker?pair=${pair}`);
    console.log(response.data);
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
    const fetchData = async () => {
      try {
        const result = await fetchCoincheckStatus();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

return (
    <div>
      <h1>Page01</h1>
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
    </div>
  );
}

export default Page01;
