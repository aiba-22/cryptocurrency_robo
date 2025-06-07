import {
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { CryptocurrencyAdjustmentOrderForm } from "./AdjustmentTradingForm";

type OrderFormProps = {
  control: Control<CryptocurrencyAdjustmentOrderForm>;
  errors: FieldErrors<CryptocurrencyAdjustmentOrderForm>;
};

const percentOptions = Array.from({ length: 100 }, (_, i) => i + 1);

export const OrderForm: React.FC<OrderFormProps> = ({ control, errors }) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "adjustmentTrading.orderForm",
  });
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name={"basePrice"}
            control={control}
            rules={{
              required: t("validation.required"),
              min: { value: 1, message: t("validation.minValue") },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("basePriceLabel")}
                type="number"
                fullWidth
                error={!!errors.basePrice}
                helperText={errors.basePrice?.message}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? undefined : Number(e.target.value)
                  )
                }
                value={field.value ?? ""}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
          >
            {t("buySectionLabel")}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Controller
            name={"buyPriceAdjustmentRate"}
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.buyPriceAdjustmentRate}>
                <InputLabel>{t("buyPriceAdjustmentRateLabel")}</InputLabel>
                <Select
                  value={(field.value ?? 0) * 100}
                  label={t("buyPriceAdjustmentRateLabel")}
                  onChange={(e) => field.onChange(Number(e.target.value) / 100)}
                >
                  {percentOptions.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}%
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.buyPriceAdjustmentRate?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name={"buyVolumeAdjustmentRate"}
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.buyVolumeAdjustmentRate}>
                <InputLabel>{t("buyVolumeAdjustmentRateLabel")}</InputLabel>
                <Select
                  value={(field.value ?? 0) * 100}
                  label={t("buyVolumeAdjustmentRateLabel")}
                  onChange={(e) => field.onChange(Number(e.target.value) / 100)}
                >
                  {percentOptions.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}%
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.buyVolumeAdjustmentRate?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            sx={{ mt: 3, mb: 1, fontWeight: "bold" }}
          >
            {t("sellSectionLabel")}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Controller
            name={"sellPriceAdjustmentRate"}
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.sellPriceAdjustmentRate}>
                <InputLabel>{t("sellPriceAdjustmentRateLabel")}</InputLabel>
                <Select
                  value={(field.value ?? 0) * 100}
                  label={t("sellPriceAdjustmentRateLabel")}
                  onChange={(e) => field.onChange(Number(e.target.value) / 100)}
                >
                  {percentOptions.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}%
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.sellPriceAdjustmentRate?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name={"sellVolumeAdjustmentRate"}
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.sellVolumeAdjustmentRate}>
                <InputLabel>{t("sellVolumeAdjustmentRateLabel")}</InputLabel>
                <Select
                  value={(field.value ?? 0) * 100}
                  label={t("sellVolumeAdjustmentRateLabel")}
                  onChange={(e) => field.onChange(Number(e.target.value) / 100)}
                >
                  {percentOptions.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}%
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.sellVolumeAdjustmentRate?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
      ;
    </>
  );
};
