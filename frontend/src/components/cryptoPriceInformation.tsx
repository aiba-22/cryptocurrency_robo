import { useState } from "react";
import { useQuery } from "react-query";
import { fetchCoincheckStatus } from "../feature/notificationSetting";
import { VIRTUAL_CURRENCIES, virtualCurrencyList } from "../feature/constants";
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
  const [virtualCurrency, setVirtualCurrency] = useState(
    VIRTUAL_CURRENCIES.BTC_JPY
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ["cryptoPrice", virtualCurrency],
    queryFn: () => fetchCoincheckStatus(virtualCurrency),
    keepPreviousData: true,
  });

  const handleChange = (event: SelectChangeEvent<string>) => {
    setVirtualCurrency(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        価格情報
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="virtual-currency-select-label">通貨ペア</InputLabel>
        <Select
          labelId="virtual-currency-select-label"
          value={virtualCurrency}
          onChange={handleChange}
        >
          {virtualCurrencyList.map((virtualCurrency) => (
            <MenuItem key={virtualCurrency} value={virtualCurrency}>
              {virtualCurrency.toUpperCase()}
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
