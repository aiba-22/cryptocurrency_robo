import {
  Container,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { OrderForm } from "./orderForm";
import { Snackbar } from "../snackBar";
import Rate from "../rate";
import { Loading } from "../loading";
import { CRYPTOCURRENCY_LIST } from "../../feature/constants";
import { Controller } from "react-hook-form";
import ToggleOrderSwitch from "./toggleOrderSwitch";
import {
  AUTOMATIC_TRADING_MESSAGES,
  isOrderSettingSaveStatus,
  SYSTEM_ERROR,
} from "../../feature/automaticTrading/automaticTradingMessages";
import { IS_ENABLED } from "../../feature/automaticTrading/constants";
import { useOrderForm } from "../../feature/automaticTrading/hooks/useOrderForm";

export const AutomaticTrading: React.FC = () => {
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  const {
    control,
    submitForm,
    watch,
    errors,
    orderSettingSaveStatus,
    isOrderListError,
    isOrderListLoading,
  } = useOrderForm();
  const isBuyEnabled = watch("buy.isEnabled");
  const isSellEnabled = watch("sell.isEnabled");
  const symbol = watch("symbol");

  useEffect(() => {
    if (
      orderSettingSaveStatus &&
      isOrderSettingSaveStatus(orderSettingSaveStatus)
    ) {
      setSnackBarMessage(AUTOMATIC_TRADING_MESSAGES[orderSettingSaveStatus]);
    } else if (isOrderListError) {
      setSnackBarMessage(SYSTEM_ERROR);
    }
  }, [orderSettingSaveStatus, isOrderListError]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        注文設定
      </Typography>
      {isOrderListLoading ? (
        <Loading />
      ) : (
        <form onSubmit={submitForm}>
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
                <ToggleOrderSwitch field={field} label="買い注文を設定" />
              )}
            />
          </Box>

          <OrderForm
            control={control}
            targetPriceField="buy.targetPrice"
            volumeField="buy.volume"
            labelPrefix="買い"
            errors={errors}
            isEnabled={isBuyEnabled}
          />

          <Box mb={2} mt={4}>
            <Controller
              name="sell.isEnabled"
              control={control}
              render={({ field }) => (
                <ToggleOrderSwitch field={field} label="売り注文を設定" />
              )}
            />
          </Box>

          <OrderForm
            control={control}
            targetPriceField="sell.targetPrice"
            volumeField="sell.volume"
            labelPrefix="売り"
            errors={errors}
            isEnabled={isSellEnabled}
          />

          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              保存
            </Button>
          </Box>
        </form>
      )}
      {snackBarMessage && <Snackbar message={snackBarMessage} />}{" "}
      <Rate symbol={symbol} />
    </Container>
  );
};
