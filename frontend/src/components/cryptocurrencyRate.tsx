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
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useListCryptocurrencyRate } from "../feature/hooks/useListCryptocurrencyRate";
import { CRYPTOCURRENCY_LIST } from "../feature/constants";
import SnackBer from "./snackBer";

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

  const { isVirtualCurrencyLoading, resultCodeOfList, cryptocurrencyRate } =
    useListCryptocurrencyRate();

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
          {CRYPTOCURRENCY_LIST.map((cryptocurrency) => (
            <MenuItem key={cryptocurrency} value={cryptocurrency}>
              {cryptocurrency.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isVirtualCurrencyLoading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}
      {resultCodeOfList.code && <SnackBer message={resultCodeOfList.code} />}
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
