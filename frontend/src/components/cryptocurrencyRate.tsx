import { useState } from "react";
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
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useCryptocurrencyRate } from "../feature/hooks/useCryptocurrencyRate";
import { VIRTUAL_CURRENCY_LIST } from "../feature/constants";

type VirtualCurrencyRate = {
  symbol?: string;
  last?: number;
  bid?: number;
  ask?: number;
  high?: number;
  low?: number;
  volume?: number;
  timestamp?: Date;
};

function CryptocurrencyRate() {
  const [virtualCurrency, setVirtualCurrency] = useState<VirtualCurrencyRate>();

  const { isVirtualCurrencyLoading, errorMessage, cryptocurrencyRate } =
    useCryptocurrencyRate();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const virtualCurrency = cryptocurrencyRate(event.target.value);

    if (virtualCurrency) {
      setVirtualCurrency(virtualCurrency);
    }
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
          value={virtualCurrency?.symbol || ""}
          onChange={handleChange}
        >
          {VIRTUAL_CURRENCY_LIST.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isVirtualCurrencyLoading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}
      {errorMessage && (
        <Box mt={2}>
          <Alert severity="success">{errorMessage}</Alert>
        </Box>
      )}
      {virtualCurrency && (
        <Box mt={2}>
          <Typography variant="h6">価格詳細</Typography>
          <Typography>最終価格: {virtualCurrency.last}</Typography>
          <Typography>買い価格: {virtualCurrency.bid}</Typography>
          <Typography>売り価格: {virtualCurrency.ask}</Typography>
          <Typography>高値: {virtualCurrency.high}</Typography>
          <Typography>安値: {virtualCurrency.low}</Typography>
          <Typography>取引量: {virtualCurrency.volume}</Typography>
        </Box>
      )}
    </Container>
  );
}

export default CryptocurrencyRate;
