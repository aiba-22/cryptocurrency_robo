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
import { useSaveCryptocurrencyOrdeSetting } from "../../feature/hooks/useSaveCryptocurrencyOrdeSetting";
import { useListCryptocurrencyOrder } from "../../feature/hooks/useListCryptocurrencyOrder";
import { useEffect, useState } from "react";
import { convertToFormData } from "../../feature/automaticTrading/convertToFormData";
import { CRYPTOCURRENCY_LIST, CRYPTOCURRENCYS } from "../../feature/constants";
import OrderForm, { Form } from "./orderForm";
import SnackBer from "../snackBer";
import { useListCryptocurrencyRate } from "../../feature/hooks/useListCryptocurrencyRate";
import Rate from "../rate";

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
      symbol: CRYPTOCURRENCYS.BTC,
      buyPrice: undefined,
      buyQuantity: undefined,
      sellPrice: undefined,
      sellQuantity: undefined,
      isBuyEnabled: false,
      isSellEnabled: false,
      buyId: undefined,
      sellId: undefined,
    },
  });

  const { saveSetting, resultSave } = useSaveCryptocurrencyOrdeSetting();
  const { cryptocurrencyOrderList } = useListCryptocurrencyOrder();
  const { cryptocurrencyRateList } = useListCryptocurrencyRate();

  const onSubmit = (data: Form) => {
    saveSetting(data);
  };

  const isBuyEnabled = watch("isBuyEnabled");
  const isSellEnabled = watch("isSellEnabled");
  const symbol = watch("symbol");

  useEffect(() => {
    if (cryptocurrencyOrderList) {
      const cryptocurrencyOrder = convertToFormData(cryptocurrencyOrderList);
      reset(cryptocurrencyOrder);
    }
  }, [cryptocurrencyOrderList, reset]);

  useEffect(() => {
    const message =
      resultSave.code === "successSaveCryptocurrencyOrdeSetting"
        ? "注文の保存が成功しました。"
        : resultSave.code === "errorSaveCryptocurrencyOrdeSetting"
        ? "注文の保存に失敗しました。"
        : "";
    setSnackBarMessage(message);
  }, [resultSave, setSnackBarMessage]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        注文設定
      </Typography>

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
            name="isBuyEnabled"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="買い注文を設定する"
              />
            )}
          />
        </Box>
        {isBuyEnabled && (
          <OrderForm
            control={control}
            enabledField="isBuyEnabled"
            priceField="buyPrice"
            quantityField="buyQuantity"
            labelPrefix="買い"
            errors={errors}
          />
        )}
        <Box mb={2} mt={4}>
          <Controller
            name="isSellEnabled"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="売り注文を設定する"
              />
            )}
          />
        </Box>
        {isSellEnabled && (
          <OrderForm
            control={control}
            enabledField="isSellEnabled"
            priceField="sellPrice"
            quantityField="sellQuantity"
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
      {snackBarMessage && <SnackBer message={snackBarMessage} />}

      {cryptocurrencyRateList?.get(symbol) && (
        <Rate cryptocurrency={cryptocurrencyRateList.get(symbol)!} />
      )}
    </Container>
  );
}

export default AutomaticTrading;
