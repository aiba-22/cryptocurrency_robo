import { Grid, TextField } from "@mui/material";
import { Controller, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { CryptocurrencyOrderForm } from "./AutomaticTrading";

type OrderFormProps = {
  control: Control<CryptocurrencyOrderForm>;
  priceErrorMessage?: string;
  volumeErrorMessage?: string;
  targetPriceField: "buy.targetPrice" | "sell.targetPrice";
  volumeField: "buy.volume" | "sell.volume";
};

export const OrderForm: React.FC<OrderFormProps> = ({
  control,
  priceErrorMessage,
  volumeErrorMessage,
  targetPriceField,
  volumeField,
}) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "automaticTrading.orderForm",
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Controller
          name={targetPriceField}
          control={control}
          rules={{
            required: t("validation.required"),
            min: {
              value: 1,
              message: t("validation.minValue"),
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("priceLabel")}
              type="number"
              fullWidth
              error={!!priceErrorMessage}
              helperText={priceErrorMessage}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name={volumeField}
          control={control}
          rules={{
            required: t("validation.required"),
            min: {
              value: 1,
              message: t("validation.minValue"),
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value}
              label={t("volumeLabel")}
              type="number"
              fullWidth
              error={!!volumeErrorMessage}
              helperText={volumeErrorMessage}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
