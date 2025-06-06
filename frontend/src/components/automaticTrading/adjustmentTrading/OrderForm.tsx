import {
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Controller, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { CryptocurrencyAdjustmentOrderForm } from "./AdjustmentTradingForm";

type OrderFormProps = {
  control: Control<CryptocurrencyAdjustmentOrderForm>;
  priceErrorMessage?: string;
  priceAdjustmentRateErrorMessage?: string;
  volumeAdjustmentRateErrorMessage?: string;
};

const percentOptions = Array.from({ length: 100 }, (_, i) => i + 1); // 1〜100

export const OrderForm: React.FC<OrderFormProps> = ({
  control,
  priceErrorMessage,
  priceAdjustmentRateErrorMessage,
  volumeAdjustmentRateErrorMessage,
}) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "adjustmentTrading.orderForm",
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Controller
          name={"basePrice"}
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
              label={t("basePriceLabel")}
              type="number"
              fullWidth
              error={!!priceErrorMessage}
              helperText={priceErrorMessage}
              onChange={(e) =>
                field.onChange((e.target as HTMLInputElement).valueAsNumber)
              }
              value={field.value ?? ""}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name={"priceAdjustmentRate"}
          control={control}
          rules={{
            required: t("validation.required"),
          }}
          render={({ field }) => (
            <FormControl fullWidth error={!!priceAdjustmentRateErrorMessage}>
              <InputLabel>{t("priceAdjustmentRateLabel")}</InputLabel>
              <Select
                value={(field.value ?? 0) * 100}
                label={t("priceAdjustmentRateLabel")}
                onChange={(e) => {
                  const selected = Number(e.target.value);
                  field.onChange(selected / 100);
                }}
              >
                {percentOptions.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}%
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{priceAdjustmentRateErrorMessage}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name={"volumeAdjustmentRate"}
          control={control}
          rules={{
            required: t("validation.required"),
          }}
          render={({ field }) => (
            <FormControl fullWidth error={!!volumeAdjustmentRateErrorMessage}>
              <InputLabel>{t("volumeAdjustmentRateLabel")}</InputLabel>
              <Select
                value={(field.value ?? 0) * 100}
                label={t("volumeAdjustmentRateLabel")}
                onChange={(e) => {
                  const selected = Number(e.target.value);
                  field.onChange(selected / 100);
                }}
              >
                {percentOptions.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}%
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {volumeAdjustmentRateErrorMessage}
              </FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  );
};
