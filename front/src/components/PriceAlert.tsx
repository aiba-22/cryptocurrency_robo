import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Box,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { useFindPriceAlertSetting } from "../feature/hooks/useFindPriceAlertSetting";
import { CRYPTOCURRENCY, CRYPTOCURRENCY_LIST } from "../feature/constants";
import { useSavePriceAlertSetting } from "../feature/hooks/useSavePriceAlertSetting";
import { Loading } from "./Loading";
import { Rate } from "./Rate";
import { Snackbar } from "./SnackBar";
import { useTranslation } from "react-i18next";

type PriceAlertSettingForm = {
  id?: number;
  symbol: string;
  isUpperLimit: boolean;
  price: number;
};

export const PriceAlert = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "priceAlert",
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PriceAlertSettingForm>({
    defaultValues: {
      id: undefined,
      symbol: CRYPTOCURRENCY.BTC,
      isUpperLimit: true,
      price: undefined,
    },
  });
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const { alertSetting, isAlertSettingFindError, isAlertSettingFindLoading } =
    useFindPriceAlertSetting();
  const { saveAlertSetting, alertSettingSaveStatus } =
    useSavePriceAlertSetting();

  const symbol = watch("symbol");

  const onSubmit = (form: PriceAlertSettingForm) => {
    saveAlertSetting(form);
  };

  useEffect(() => {
    if (alertSetting) reset(alertSetting);
  }, [alertSetting, reset]);

  useEffect(() => {
    if (alertSettingSaveStatus) {
      setSnackBarMessage(
        t(`save.${alertSettingSaveStatus}`, {
          defaultValue: t("systemError"),
        })
      );
    }
  }, [alertSettingSaveStatus, t]);

  useEffect(() => {
    if (isAlertSettingFindError) {
      setSnackBarMessage(
        t(`findSetting.${isAlertSettingFindError}`, {
          defaultValue: t("systemError"),
        })
      );
    }
  }, [isAlertSettingFindError, t]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>
      {isAlertSettingFindLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <Controller
              name="symbol"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="symbol-label">
                    {t("form.symbolLabel")}
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="symbol-label"
                    label={t("form.symbolLabel")}
                  >
                    {CRYPTOCURRENCY_LIST.map((cryptocurrency) => (
                      <MenuItem key={cryptocurrency} value={cryptocurrency}>
                        {cryptocurrency.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            {errors.symbol && (
              <Alert severity="error">{errors.symbol.message}</Alert>
            )}
          </FormControl>

          <Controller
            name="price"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  field.onChange(val === "" ? "" : Number(val));
                }}
                fullWidth
                margin="normal"
                label={t("form.priceLabel")}
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                placeholder={t("form.pricePlaceholder")}
              />
            )}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="is-upper-limit-label">
              {t("form.conditionLabel")}
            </InputLabel>
            <Controller
              name="isUpperLimit"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="is-upper-limit-label"
                  value={field.value ? "true" : "false"}
                  label={t("form.conditionLabel")}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                >
                  <MenuItem value="true">{t("form.conditionUpper")}</MenuItem>
                  <MenuItem value="false">{t("form.conditionLower")}</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              {t("form.saveButton")}
            </Button>
          </Box>
        </form>
      )}

      {snackBarMessage && <Snackbar message={snackBarMessage} />}
      <Rate symbol={symbol} />
    </Container>
  );
};
