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
import { useVirtualCurrency } from "../feature/hooks/useNotificationSettings";
import {
  VIRTUAL_CURRENCIES,
  VIRTUAL_CURRENCY_LIST,
} from "../feature/constants";

function AutomaticTrading() {
  const [virtualCurrency, setVirtualCurrency] = useState(
    VIRTUAL_CURRENCIES.BTC_JPY
  );

  // TODO: GMOAPIからの取得に変更
  const {
    virtualCurrencyTradingPriceList,
    isVirtualCurrencyError,
    isVirtualCurrencyLoading,
  } = useVirtualCurrency();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setVirtualCurrency(event.target.value);
  };

  // TODO: useformを利用したform入力を実装

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

      {virtualCurrencyTradingPriceList && (
        <Box mt={2}>
          <Typography variant="h6">価格詳細</Typography>
          <Typography>
            最終価格: {virtualCurrencyTradingPriceList.last}
          </Typography>
          <Typography>
            買い価格: {virtualCurrencyTradingPriceList.bid}
          </Typography>
          <Typography>
            売り価格: {virtualCurrencyTradingPriceList.ask}
          </Typography>
          <Typography>高値: {virtualCurrencyTradingPriceList.high}</Typography>
          <Typography>安値: {virtualCurrencyTradingPriceList.low}</Typography>
          <Typography>
            取引量: {virtualCurrencyTradingPriceList.volume}
          </Typography>
          <Typography>
            タイムスタンプ:{" "}
            {new Date(
              virtualCurrencyTradingPriceList.timestamp * 1000
            ).toLocaleString()}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default AutomaticTrading;
