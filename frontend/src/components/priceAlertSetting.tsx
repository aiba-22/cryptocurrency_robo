import { useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { usePriceAlertSettings } from "../feature/hooks/priceAlert/usePriceAlertSetting";
import {
  VIRTUAL_CURRENCIES,
  VIRTUAL_CURRENCY_LIST,
} from "../feature/constants";
import { useLineNotification } from "../feature/hooks/line/useNotification";
import { useSaveTargetPriceSettings } from "../feature/hooks/priceAlert/useSavePriceAlertSetting";

type Form = {
  id?: number;
  isUpperLimit: boolean;
  cryptocurrencyType: string;
  price: number;
  lineToken: string;
  userId: string;
};

function PrieAlertSetting() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Form>({
    defaultValues: {
      id: 1,
      cryptocurrencyType: VIRTUAL_CURRENCIES.BTC_JPY,
      isUpperLimit: true,
      price: 0,
      lineToken: "",
      userId: "",
    },
  });

  const {
    notificationSetting,
    isNotificationError,
    isNotificationLoading,
    errorMessage,
  } = usePriceAlertSettings();

  useEffect(() => {
    if (notificationSetting) reset(notificationSetting);
  }, [notificationSetting, reset]);

  const { resultMessage: saveResultMessage, saveSettings } =
    useSaveTargetPriceSettings();

  const { resultMessage: notificationResultMessage, sendNotification } =
    useLineNotification();

  const onSubmit = async (data: Form) => {
    saveSettings(data);
  };

  const handleNotificationTestButton = async () => {
    const { price } = getValues();
    sendNotification(price);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        通知設定
      </Typography>
      目標価格を超えるとLINEへの通知が送られます
      {!isNotificationLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="virtual-currency-type-label">指定通貨</InputLabel>
            <Controller
              name="cryptocurrencyType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="virtual-currency-type-label"
                  onChange={(e: SelectChangeEvent) =>
                    field.onChange(e.target.value)
                  }
                >
                  {VIRTUAL_CURRENCY_LIST.map((virtualCurrency) => (
                    <MenuItem key={virtualCurrency} value={virtualCurrency}>
                      {virtualCurrency.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.cryptocurrencyType && (
              <Alert severity="error">
                {errors.cryptocurrencyType.message}
              </Alert>
            )}
          </FormControl>

          <Controller
            name="price"
            control={control}
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
                  {...field}
                  labelId="is-upper-limit-label"
                  label="通知条件"
                  onChange={(e: SelectChangeEvent) =>
                    field.onChange(e.target.value === "true")
                  }
                  value={String(field.value)} // "true" または "false"
                >
                  <MenuItem value="true">価格が上回ったら通知</MenuItem>
                  <MenuItem value="false">価格が下回ったら通知</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <Controller
            name="lineToken"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="LINEトークン"
                type="password"
                error={!!errors.lineToken}
                helperText={errors.lineToken?.message}
              />
            )}
          />

          <Controller
            name="userId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="LINEユーザーID"
                type="password"
                error={!!errors.userId}
                helperText={errors.userId?.message}
              />
            )}
          />

          {isNotificationError && (
            <div>
              <Alert severity="error">データ取得に失敗しました</Alert>
            </div>
          )}

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              設定を保存
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleNotificationTestButton}
            >
              LINEに通知テスト
            </Button>
          </Box>

          {(errorMessage || saveResultMessage || notificationResultMessage) && (
            <Box mt={2}>
              <Alert severity="info">
                {errorMessage || saveResultMessage || notificationResultMessage}
              </Alert>
            </Box>
          )}
        </form>
      )}
    </Container>
  );
}

export default PrieAlertSetting;
