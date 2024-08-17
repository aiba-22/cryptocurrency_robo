import { useState, useEffect, ChangeEvent } from "react";
import { fetchCoincheckStatus } from "../feature/notificationSettings";
import { currencyPairs } from "../feature/enums";

type TickerData = {
  last: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
};

function CryptoPriceInformation() {
  const [data, setData] = useState<TickerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pair, setPair] = useState("btc_jpy");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchCoincheckStatus(pair);
        setData(result);
        setLoading(false);
      } catch (error) {
        setError("取得に失敗しました。");
        setLoading(false);
      }
    };

    fetchData();
  }, [pair]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPair(event.target.value);
  };

  return (
    <div>
      <h1>価格情報</h1>
      <select value={pair} onChange={handleChange}>
        {currencyPairs.map((pair) => (
          <option key={pair} value={pair}>
            {pair.toUpperCase()}
          </option>
        ))}
      </select>
      {loading && <div>Loading...</div>}
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
    </div>
  );
}

export default CryptoPriceInformation;
