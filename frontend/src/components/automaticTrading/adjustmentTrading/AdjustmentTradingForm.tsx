import {
  Container,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import {
  CRYPTOCURRENCY,
  CRYPTOCURRENCY_LIST,
} from "../../../feature/constants";
import { IS_ENABLED } from "../../../feature/automaticTrading/constants";
import { Loading } from "../../Loading";
import ToggleOrderSwitch from "../ToggleOrderSwitch";
import { Rate } from "../../Rate";
import { OrderForm } from "./OrderForm";
import { useSaveForm } from "../../../feature/automaticTrading/hooks/AdjustmentOrder/useSaveForm";
import { useFindCryptocurrencyAdjustmentOrder } from "../../../feature/automaticTrading/hooks/AdjustmentOrder/useFindCryptocurrencyAdjustmentOrder";

export type CryptocurrencyAdjustmentOrderForm = {
  id?: number;
  symbol: string;
  basePrice: number;
  priceAdjustmentRate: number;
  volumeAdjustmentRate: number;
  isEnabled: number;
};

export const AdjustmentTradingForm = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "adjustmentTrading",
  });

  const [snackBarMessage, setSnackBarMessage] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CryptocurrencyAdjustmentOrderForm>({
    defaultValues: {
      symbol: CRYPTOCURRENCY.BTC,
      basePrice: undefined,
      priceAdjustmentRate: undefined,
      volumeAdjustmentRate: undefined,
      isEnabled: IS_ENABLED.FALSE,
    },
  });

  const {
    cryptocurrencyAdjustmentOrderList,
    isOrderListError,
    isOrderListLoading,
  } = useFindCryptocurrencyAdjustmentOrder();

  useEffect(() => {
    if (cryptocurrencyAdjustmentOrderList) {
      reset(cryptocurrencyAdjustmentOrderList);
    }
  }, [cryptocurrencyAdjustmentOrderList, reset]);

  const isEnabled = watch("isEnabled");
  const symbol = watch("symbol");

  const { saveOrderForm, orderSaveStatus } = useSaveForm();

  useEffect(() => {
    if (orderSaveStatus) {
      setSnackBarMessage(
        t(`save.${orderSaveStatus}`, {
          defaultValue: t("systemError"),
        })
      );
    }
  }, [orderSaveStatus, t]);

  useEffect(() => {
    if (isOrderListError) {
      setSnackBarMessage(t("list.systemError"));
    }
  }, [isOrderListError, t]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>
      {isOrderListLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(saveOrderForm)}>
          <Box mb={2}>
            <Controller
              name="symbol"
              control={control}
              rules={{ required: t("validation.selectCurrency") }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="symbol-label">
                    {t("form.symbolLabel")}
                  </InputLabel>
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
              name="isEnabled"
              control={control}
              render={({ field }) => (
                <ToggleOrderSwitch
                  field={field}
                  label={t("form.enableSwitchLabel")}
                />
              )}
            />
          </Box>
          <Box
            mb={2}
            sx={{
              opacity: isEnabled === IS_ENABLED.TRUE ? 1 : 0.5,
              pointerEvents: isEnabled === IS_ENABLED.TRUE ? "auto" : "none",
            }}
          >
            <OrderForm
              control={control}
              priceErrorMessage={errors?.basePrice?.message}
              priceAdjustmentRateErrorMessage={
                errors?.priceAdjustmentRate?.message
              }
              volumeAdjustmentRateErrorMessage={
                errors?.volumeAdjustmentRate?.message
              }
            />
          </Box>

          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              {t("form.saveButton")}
            </Button>
          </Box>
        </form>
      )}
      {snackBarMessage && <Snackbar message={snackBarMessage} />}{" "}
      <Rate symbol={symbol} />
    </Container>
  );
};
