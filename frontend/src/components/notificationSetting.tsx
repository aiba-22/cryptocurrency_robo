import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  fetchCoincheckStatus,
  fetchSettings,
  saveSettings,
  hundleLineNotificationTestButton,
  Setting,
} from "../feature/notificationSetting";
import { VIRTUAL_CURRENCY_LIST } from "../feature/constants";
import { settingsSchema } from "../feature/notificationSettingSchema";
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
  SelectChangeEvent,
} from "@mui/material";

function NotificationSetting() {
  const [infomation, setInfomation] = useState("");
  const [displaySetting, setDisplaySetting] = useState<Setting>({
    id: null,
    virtualCurrencyType: "btc_jpy",
    targetPrice: 0,
    lineToken: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const {
    data: virtualCurrencyList,
    isError: isVirtualCurrencyListError,
    isLoading: isVirtualCurrencyListLoading,
  } = useQuery({
    queryKey: ["ticker", displaySetting.virtualCurrencyType],
    queryFn: () => fetchCoincheckStatus(displaySetting.virtualCurrencyType),
    keepPreviousData: true,
  });

  const {
    isError: isNotificationSettingError,
    isLoading: isNotificationSettingLoading,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    onSuccess: (settings) => {
      if (settings) {
        setDisplaySetting(settings);
      }
    },
  });

  const handleTargetPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplaySetting((prevSetting) => ({
      ...prevSetting,
      targetPrice: parseInt(event.target.value, 10),
    }));
  };

  const handleVirtualCurrencyTypeChange = (
    event: SelectChangeEvent<string>
  ) => {
    setDisplaySetting((prevSetting) => ({
      ...prevSetting,
      virtualCurrencyType: event.target.value,
    }));
  };

  const handleLineTokenChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplaySetting((prevSetting) => ({
      ...prevSetting,
      lineToken: event.target.value,
    }));
  };

  const handleSettingSaveButton = async () => {
    try {
      const validatedData = settingsSchema.parse(displaySetting);
      await saveSettings({ displaySetting: validatedData });
      setInfomation("設定が保存されました。");
    } catch (error: any) {
      const formattedErrors: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setValidationErrors(formattedErrors);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        通知設定
      </Typography>
      目標価格を超えるとLINEへの通知が送られます
      {!isNotificationSettingLoading && !isVirtualCurrencyListLoading && (
        <div>
          <FormControl fullWidth margin="normal">
            <InputLabel id="virtual-currency-type-label">指定通貨</InputLabel>
            <Select
              labelId="virtual-currency-type-label"
              value={displaySetting.virtualCurrencyType}
              onChange={handleVirtualCurrencyTypeChange}
            >
              {VIRTUAL_CURRENCY_LIST.map((virtualCurrency) => (
                <MenuItem key={virtualCurrency} value={virtualCurrency}>
                  {virtualCurrency.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
            {validationErrors.virtualCurrencyType && (
              <Alert severity="error">
                {validationErrors.virtualCurrencyType}
              </Alert>
            )}
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="目標価格"
            type="number"
            value={displaySetting.targetPrice}
            onChange={handleTargetPriceChange}
            placeholder="例: 5000000"
            error={!!validationErrors.targetPrice}
            helperText={validationErrors.targetPrice}
          />

          <TextField
            fullWidth
            margin="normal"
            label="LINEトークン"
            type="password"
            value={displaySetting.lineToken}
            onChange={handleLineTokenChange}
            error={!!validationErrors.lineToken}
            helperText={validationErrors.lineToken}
          />

          {(isNotificationSettingError || isVirtualCurrencyListError) && (
            <div>
              <Alert severity="error">データ取得に失敗しました</Alert>
            </div>
          )}

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSettingSaveButton}
            >
              設定を保存
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() =>
                hundleLineNotificationTestButton({
                  setInfomation,
                  price: virtualCurrencyList?.last,
                })
              }
            >
              LINEに通知テスト
            </Button>
          </Box>

          {infomation && (
            <Box mt={2}>
              <Alert severity="success">{infomation}</Alert>
            </Box>
          )}
        </div>
      )}
    </Container>
  );
}

export default NotificationSetting;
