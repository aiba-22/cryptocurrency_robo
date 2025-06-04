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

export const PriceAlertSetting = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "line",
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
      setSnackBarMessage(t(`save.${alertSettingSaveStatus}`));
    }
  }, [alertSettingSaveStatus, t]);

  useEffect(() => {
    if (isAlertSettingFindError) {
      setSnackBarMessage(`findSetting.${isAlertSettingFindError}`);
    }
  }, [alertSettingSaveStatus, isAlertSettingFindError, setSnackBarMessage]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        価格アラート設定
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
            {errors.symbol && (
              <Alert severity="error">{errors.symbol.message}</Alert>
            )}
          </FormControl>

          <Controller
            name="price"
            control={control}
            rules={{ required: "入力必須項目です" }}
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
                label="目標価格"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                placeholder="例: 5000000"
              />
            )}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="is-upper-limit-label">通知条件</InputLabel>
            <Controller
              name="isUpperLimit"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="is-upper-limit-label"
                  value={field.value ? "true" : "false"}
                  label="通知条件"
                  onChange={(e) => field.onChange(e.target.value === "true")}
                >
                  <MenuItem value="true">価格が上回ったら</MenuItem>
                  <MenuItem value="false">価格が下回ったら</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              保存
            </Button>
          </Box>
        </form>
      )}

      {snackBarMessage && <Snackbar message={snackBarMessage} />}
      <Rate symbol={symbol} />
    </Container>
  );
};
