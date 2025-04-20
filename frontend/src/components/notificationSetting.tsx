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

import { useNotificationSetting } from "../feature/hooks/useNotificationSettings";
import {
  VIRTUAL_CURRENCIES,
  VIRTUAL_CURRENCY_LIST,
} from "../feature/constants";
import { useLineNotification } from "../feature/hooks/useLineNotification";
import { useSaveTargetPrice } from "../feature/hooks/useSaveTargetPrice";

type Form = {
  id?: number;
  virtualCurrencyType: string;
  targetPrice: number;
  lineToken: string;
  userId: string;
};

function NotificationSetting() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Form>({
    defaultValues: {
      id: 1,
      virtualCurrencyType: VIRTUAL_CURRENCIES.BTC_JPY,
      targetPrice: 0,
      lineToken: "",
      userId: "",
    },
  });

  const {
    notificationSetting,
    isNotificationError,
    isNotificationLoading,
    errorMessage,
  } = useNotificationSetting();

  useEffect(() => {
    if (notificationSetting) reset(notificationSetting);
  }, [notificationSetting, reset]);

  const { resultMessage: saveResultMessage, saveSettings } =
    useSaveTargetPrice();

  const { resultMessage: notificationResultMessage, sendNotification } =
    useLineNotification();

  const onSubmit = async (data: Form) => {
    saveSettings(data);
  };

  const handleNotificationTestButton = async () => {
    const { targetPrice } = getValues();
    sendNotification(targetPrice);
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
              name="virtualCurrencyType"
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
            {errors.virtualCurrencyType && (
              <Alert severity="error">
                {errors.virtualCurrencyType.message}
              </Alert>
            )}
          </FormControl>

          <Controller
            name="targetPrice"
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
                error={!!errors.targetPrice}
                helperText={errors.targetPrice?.message}
                placeholder="例: 5000000"
              />
            )}
          />

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

export default NotificationSetting;
