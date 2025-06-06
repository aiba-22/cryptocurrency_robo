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
import { IS_ENABLED } from "../../../feature/automaticTrading/constants";
import { mapOrderListToFormValues } from "../../../feature/automaticTrading/orderFormMapper.ts";
import { Loading } from "../../Loading.tsx";
import {
  CRYPTOCURRENCY,
  CRYPTOCURRENCY_LIST,
} from "../../../feature/constants.ts";
import { OrderForm } from "./OrderForm.tsx";
import { Rate } from "../../Rate.tsx";
import ToggleOrderSwitch from "../ToggleOrderSwitch.tsx";
import { useListCryptocurrencyStaticOrder } from "../../../feature/rate/hooks/useListCryptocurrencyStaticOrder.ts";
import { useSaveForm } from "../../../feature/automaticTrading/hooks/staticOrder/useSaveForm.ts";

type Conditions = {
  id?: number;
  targetPrice: number;
  volume: number;
  isEnabled: number;
};

export type CryptocurrencyStaticOrderForm = {
  symbol: string;
  buy: Conditions;
  sell: Conditions;
};

export const StaticOrderTradingForm = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "repeatTrading",
  });

  const [snackBarMessage, setSnackBarMessage] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CryptocurrencyStaticOrderForm>({
    defaultValues: {
      symbol: CRYPTOCURRENCY.BTC,
      buy: {
        targetPrice: undefined,
        volume: undefined,
        isEnabled: IS_ENABLED.FALSE,
      },
      sell: {
        targetPrice: undefined,
        volume: undefined,
        isEnabled: IS_ENABLED.FALSE,
      },
    },
  });

  const {
    cryptocurrencyStaticOrderList,
    isOrderListError,
    isOrderListLoading,
  } = useListCryptocurrencyStaticOrder();

  useEffect(() => {
    if (cryptocurrencyStaticOrderList) {
      reset(mapOrderListToFormValues(cryptocurrencyStaticOrderList));
    }
  }, [cryptocurrencyStaticOrderList, reset]);

  const isBuyEnabled = watch("buy.isEnabled");
  const isSellEnabled = watch("sell.isEnabled");
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
              name="buy.isEnabled"
              control={control}
              render={({ field }) => (
                <ToggleOrderSwitch
                  field={field}
                  label={t("form.buySwitchLabel")}
                />
              )}
            />
          </Box>
          <Box
            mb={2}
            sx={{
              opacity: isBuyEnabled === IS_ENABLED.TRUE ? 1 : 0.5,
              pointerEvents: isBuyEnabled === IS_ENABLED.TRUE ? "auto" : "none",
            }}
          >
            <OrderForm
              control={control}
              targetPriceField="buy.targetPrice"
              volumeField="buy.volume"
              priceErrorMessage={errors?.buy?.targetPrice?.message}
              volumeErrorMessage={errors?.buy?.volume?.message}
            />
          </Box>

          <Box mb={2} mt={4}>
            <Controller
              name="sell.isEnabled"
              control={control}
              render={({ field }) => (
                <ToggleOrderSwitch
                  field={field}
                  label={t("form.sellSwitchLabel")}
                />
              )}
            />
          </Box>
          <Box
            mb={2}
            sx={{
              opacity: isSellEnabled === IS_ENABLED.TRUE ? 1 : 0.5,
              pointerEvents:
                isSellEnabled === IS_ENABLED.TRUE ? "auto" : "none",
            }}
          >
            <OrderForm
              control={control}
              targetPriceField="sell.targetPrice"
              volumeField="sell.volume"
              priceErrorMessage={errors?.sell?.targetPrice?.message}
              volumeErrorMessage={errors?.sell?.volume?.message}
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
