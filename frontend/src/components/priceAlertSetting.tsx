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
import { SelectChangeEvent } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { useFindPriceAlertSetting } from "../feature/hooks/useFindPriceAlertSetting";
import { CRYPTOCURRENCY, CRYPTOCURRENCY_LIST } from "../feature/constants";
import { useSavePriceAlertSetting } from "../feature/hooks/useSavePriceAlertSetting";
import SnackBer from "./snackBer";
import Rate from "./rate";
import Loading from "./loading";

type PriceAlertSettingForm = {
  id?: number;
  symbol: string;
  isUpperLimit: boolean;
  price: number;
};

function PriceAlertSetting() {
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
      isUpperLimit: undefined,
      price: 0,
    },
  });
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const { alertSetting, isAlertSettingFindError, isAlertSettingFindLoading } =
    useFindPriceAlertSetting();
  const { saveAlertSetting, alertSettingSaveStatus } =
    useSavePriceAlertSetting();

  const symbol = watch("symbol");

  const handleSymbolChange = (
    e: SelectChangeEvent,
    onChange: (value: string) => void
  ) => {
    onChange(e.target.value);
  };

  const onSubmit = (form: PriceAlertSettingForm) => {
    saveAlertSetting(form);
  };

  useEffect(() => {
    if (alertSetting) reset(alertSetting);
  }, [alertSetting, reset]);

  useEffect(() => {
    if (alertSettingSaveStatus === "success") {
      setSnackBarMessage("保存に成功しました。");
    }
    if (alertSettingSaveStatus === "error") {
      setSnackBarMessage("保存に失敗しました。");
    }
  }, [alertSettingSaveStatus, setSnackBarMessage]);

  useEffect(() => {
    if (isAlertSettingFindError) {
      setSnackBarMessage("システムエラー");
      return;
    }
  }, [isAlertSettingFindError, setSnackBarMessage]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        価格アラート
      </Typography>
      {isAlertSettingFindLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="virtual-currency-type-label">指定通貨</InputLabel>
            <Controller
              name="symbol"
              control={control}
              rules={{ required: "入力必須項目です" }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="virtual-currency-type-label"
                  onChange={(e: SelectChangeEvent) =>
                    handleSymbolChange(e, field.onChange)
                  }
                >
                  {CRYPTOCURRENCY_LIST.map((cryptocurrency) => (
                    <MenuItem key={cryptocurrency} value={cryptocurrency}>
                      {cryptocurrency.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
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
              rules={{ required: "入力必須項目です" }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="is-upper-limit-label"
                  label="通知条件"
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  value={String(field.value)}
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

      {snackBarMessage && <SnackBer message={snackBarMessage} />}
      <Rate symbol={symbol} />
    </Container>
  );
}

export default PriceAlertSetting;
