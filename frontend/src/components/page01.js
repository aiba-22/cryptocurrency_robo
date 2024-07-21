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

function Page01() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pair, setPair] = useState('btc_jpy');

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
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [pair]);

  const handleChange = (event) => {
    setPair(event.target.value);
  };

  return (
    <div>
      <h1>Page01</h1>
      <select value={pair} onChange={handleChange}>
        {pairs.map((pair) => (
          <option key={pair} value={pair}>
            {pair.toUpperCase()}
          </option>
        ))}
      </select>
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
    </div>
  );
}

export default Page01;
