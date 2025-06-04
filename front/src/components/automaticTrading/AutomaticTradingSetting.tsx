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
import { Snackbar } from "../SnackBar";
import { Rate } from "../Rate";
import { Loading } from "../Loading";
import { CRYPTOCURRENCY_LIST } from "../../feature/constants";
import { Controller } from "react-hook-form";

import { IS_ENABLED } from "../../feature/automaticTrading/constants";
import { useOrderForm } from "../../feature/automaticTrading/hooks/useOrderForm";
import { OrderForm } from "./OrderForm";
import ToggleOrderSwitch from "./ToggleOrderSwitch";
import { useTranslation } from "react-i18next";

export const AutomaticTradingSetting = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "automaticTradingSetting",
  });

  const [snackBarMessage, setSnackBarMessage] = useState("");

  const {
    control,
    submitForm,
    watch,
    formErrors,
    orderSaveStatus,
    isOrderListError,
    isOrderListLoading,
  } = useOrderForm();

  const isBuyEnabled = watch("buy.isEnabled");
  const isSellEnabled = watch("sell.isEnabled");
  const symbol = watch("symbol");

  useEffect(() => {
    if (orderSaveStatus) {
      setSnackBarMessage(t(`save.${orderSaveStatus}`));
    }
  }, [orderSaveStatus, t]);

  useEffect(() => {
    if (isOrderListError) {
      setSnackBarMessage(t("orderList.systemError"));
    }
  }, [isOrderListError, t]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        自動取引設定
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
                  <InputLabel id="symbol-label">対象通貨</InputLabel>
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
          {isBuyEnabled === IS_ENABLED.TRUE && (
            <OrderForm
              control={control}
              targetPriceField="buy.targetPrice"
              volumeField="buy.volume"
              labelPrefix="買い"
              priceErrorMessage={formErrors?.buy?.targetPrice?.message}
              volumeErrorMessage={formErrors?.buy?.volume?.message}
            />
          )}

          <Box mb={2} mt={4}>
            <Controller
              name="sell.isEnabled"
              control={control}
              render={({ field }) => (
                <ToggleOrderSwitch field={field} label="売り注文を設定" />
              )}
            />
          </Box>
          {isSellEnabled === IS_ENABLED.TRUE && (
            <OrderForm
              control={control}
              targetPriceField="sell.targetPrice"
              volumeField="sell.volume"
              labelPrefix="売り"
              priceErrorMessage={formErrors?.sell?.targetPrice?.message}
              volumeErrorMessage={formErrors?.sell?.volume?.message}
            />
          )}

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
