import {
  Container,
  Typography,
  Button,
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSaveCryptocurrencyOrderSetting } from "../../feature/hooks/useSaveCryptocurrencyOrderSetting";
import { useListCryptocurrencyOrder } from "../../feature/hooks/useListCryptocurrencyOrder";
import { useEffect, useState } from "react";
import { convertToFormData } from "../../feature/automaticTrading/convertToFormData";
import { CRYPTOCURRENCY_LIST, CRYPTOCURRENCY } from "../../feature/constants";
import OrderForm, { Form } from "./orderForm";
import SnackBer from "../snackBer";
import Rate from "../rate";
import Loading from "../loading";

export const ORDER_TYPE = { BUY: 0, SELL: 1 };
export const IS_ENABLED = { TRUE: 1, FALSE: 0 };

function AutomaticTrading() {
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      symbol: CRYPTOCURRENCY.BTC,
      buy: {
        id: undefined,
        targetPrice: undefined,
        volume: undefined,
        isEnabled: IS_ENABLED.FALSE,
      },
      sell: {
        id: undefined,
        targetPrice: undefined,
        volume: undefined,
        isEnabled: IS_ENABLED.FALSE,
      },
    },
  });

  const onSubmit = (data: Form) => {
    const { symbol, buy, sell } = data;

    if (buy.targetPrice && buy.volume) {
      saveOrderSetting({ symbol, ...buy, type: ORDER_TYPE.BUY });
    }
    if (sell.targetPrice && sell.volume) {
      saveOrderSetting({ symbol, ...buy, type: ORDER_TYPE.SELL });
    }
  };

  const { saveOrderSetting, orderSettingSaveStatus } =
    useSaveCryptocurrencyOrderSetting();
  const { cryptocurrencyOrderList, isOrderListError, isOrderListLoading } =
    useListCryptocurrencyOrder();

  const isBuyEnabled = watch("buy.isEnabled");
  const isSellEnabled = watch("sell.isEnabled");
  const symbol = watch("symbol");

  useEffect(() => {
    if (cryptocurrencyOrderList) {
      const order = convertToFormData(cryptocurrencyOrderList);
      reset(order);
    }
  }, [cryptocurrencyOrderList, reset]);

  useEffect(() => {
    if (orderSettingSaveStatus === "success") {
      setSnackBarMessage("保存に成功しました。");
    }
    if (orderSettingSaveStatus === "error") {
      setSnackBarMessage("保存に失敗しました。");
    }
  }, [orderSettingSaveStatus, setSnackBarMessage]);

  useEffect(() => {
    if (isOrderListError) setSnackBarMessage("システムエラー");
  }, [isOrderListError, setSnackBarMessage]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        注文設定
      </Typography>
      {isOrderListLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <Controller
              name="symbol"
              control={control}
              rules={{ required: "通貨を選択してください" }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="symbol-label">通貨</InputLabel>
                  <Select {...field} labelId="symbol-label" label="通貨">
                    {CRYPTOCURRENCY_LIST.map((cryptocurrency) => (
                      <MenuItem key={cryptocurrency} value={cryptocurrency}>
                        {cryptocurrency.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="buy.isEnabled"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value === 1}
                      onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                      color="primary"
                    />
                  }
                  label="買い注文を設定"
                />
              )}
            />
          </Box>
          {isBuyEnabled === 1 && (
            <OrderForm
              control={control}
              targetPriceField="buy.targetPrice"
              quantityField="buy.volume"
              labelPrefix="買い"
              errors={errors}
            />
          )}
          <Box mb={2} mt={4}>
            <Controller
              name="sell.isEnabled"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value === 1}
                      onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                      color="primary"
                    />
                  }
                  label="売り注文を設定"
                />
              )}
            />
          </Box>
          {isSellEnabled === 1 && (
            <OrderForm
              control={control}
              targetPriceField="sell.targetPrice"
              quantityField="sell.volume"
              labelPrefix="売り"
              errors={errors}
            />
          )}
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              保存
            </Button>
          </Box>
        </form>
      )}
      {snackBarMessage && <SnackBer message={snackBarMessage} />}
      <Rate symbol={symbol} />
    </Container>
  );
}

export default AutomaticTrading;
