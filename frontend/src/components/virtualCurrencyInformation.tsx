import { useEffect, useState } from "react";
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
import { useVirtualCurrency } from "../feature/hooks/useNotificationSettings";
import {
  VIRTUAL_CURRENCIES,
  VIRTUAL_CURRENCY_LIST,
} from "../feature/constants";

type UseVirtualCurrency = {
  last: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  volume: number;
  timestamp: 0;
};

function VirtualCurrencyInformation() {
  const [selectedCrypto, setSelectedCrypto] = useState(
    VIRTUAL_CURRENCIES.BTC_JPY
  );
  const [virtualCurrency, setVirtualCurrency] = useState<UseVirtualCurrency>({
    last: 0,
    bid: 0,
    ask: 0,
    high: 0,
    low: 0,
    volume: 0,
    timestamp: 0,
  });

  const {
    virtualCurrencyTradingPriceList,
    isVirtualCurrencyError,
    isVirtualCurrencyLoading,
  } = useVirtualCurrency();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCrypto(event.target.value);
    if (virtualCurrencyTradingPriceList) {
      const virtualCurrencyTradingPrice = virtualCurrencyTradingPriceList.find(
        (virtualCurrencyTradingPrice: any) => {
          return virtualCurrencyTradingPrice.symbol === event.target.value;
        }
      );
      setVirtualCurrency(virtualCurrencyTradingPrice);
    }
  };

  useEffect(() => {
    if (virtualCurrencyTradingPriceList) {
      const virtualCurrencyTradingPrice = virtualCurrencyTradingPriceList.find(
        (r: any) => {
          return r.symbol === VIRTUAL_CURRENCIES.BTC_JPY;
        }
      );
      setVirtualCurrency(virtualCurrencyTradingPrice);
    }
  }, [virtualCurrencyTradingPriceList]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        価格情報
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="virtual-currency-select-label">通貨ペア</InputLabel>
        <Select
          labelId="virtual-currency-select-label"
          value={selectedCrypto}
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

      {isVirtualCurrencyError && (
        <Alert severity="error">システムエラーが発生しました</Alert>
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

export default VirtualCurrencyInformation;
