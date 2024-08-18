import { useState } from "react";
import { useQuery } from "react-query";
import { fetchCoincheckStatus } from "../feature/notificationSettings";
import { currencyPairs } from "../feature/enums";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Alert,
  SelectChangeEvent,
} from "@mui/material";

function CryptoPriceInformation() {
  const [pair, setPair] = useState("btc_jpy");

  const { data, error, isLoading } = useQuery({
    queryKey: ["cryptoPrice", pair],
    queryFn: () => fetchCoincheckStatus(pair),
    keepPreviousData: true,
  });

  const handleChange = (event: SelectChangeEvent<string>) => {
    setPair(event.target.value as string);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        価格情報
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="crypto-pair-select-label">通貨ペア</InputLabel>
        <Select
          labelId="crypto-pair-select-label"
          value={pair}
          onChange={handleChange}
        >
          {currencyPairs.map((pair) => (
            <MenuItem key={pair} value={pair}>
              {pair.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">システムエラーが発生しました</Alert>}

      {data && (
        <Box mt={2}>
          <Typography variant="h6">価格詳細</Typography>
          <Typography>最終価格: {data.last}</Typography>
          <Typography>買い価格: {data.bid}</Typography>
          <Typography>売り価格: {data.ask}</Typography>
          <Typography>高値: {data.high}</Typography>
          <Typography>安値: {data.low}</Typography>
          <Typography>取引量: {data.volume}</Typography>
          <Typography>
            タイムスタンプ: {new Date(data.timestamp * 1000).toLocaleString()}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default CryptoPriceInformation;
