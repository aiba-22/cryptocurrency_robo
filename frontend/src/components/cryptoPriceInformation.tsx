import { useState, ChangeEvent } from "react";
import { useQuery } from "react-query";
import { fetchCoincheckStatus } from "../feature/notificationSettings";
import { currencyPairs } from "../feature/enums";

function CryptoPriceInformation() {
  const [pair, setPair] = useState("btc_jpy");

  const { data, error, isLoading } = useQuery({
    queryKey: ["cryptoPrice", pair],
    queryFn: () => fetchCoincheckStatus(pair),
    keepPreviousData: true,
  });

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
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: システムエラーが発生しました</div>}
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
