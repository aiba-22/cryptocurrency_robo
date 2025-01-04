import React, { useState } from "react";
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

import {
  useVirtualCurrencyList,
  useNotificationSetting,
} from "../feature/hooks/useNotificationSettings";

import {
  hundleLineNotificationTestButton,
  Setting,
  validateAndSaveSettings,
} from "../feature/notificationSetting";
import {
  VIRTUAL_CURRENCIES,
  VIRTUAL_CURRENCY_LIST,
} from "../feature/constants";

function NotificationSetting() {
  const [snackbarInfomation, setSnackbarInfomation] = useState("");
  const [notificationSetting, setNotificationSetting] = useState<Setting>({
    id: null,
    virtualCurrencyType: VIRTUAL_CURRENCIES.BTC_JPY,
    targetPrice: 0,
    lineToken: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const {
    virtualCurrencyTradingPrice,
    isVirtualCurrencyError,
    isVirtualCurrencyLoading,
  } = useVirtualCurrencyList(notificationSetting.virtualCurrencyType);

  const { isNotificationSettingError, isNotificationSettingLoading } =
    useNotificationSetting((notificationSetting) => {
      if (notificationSetting) {
        setNotificationSetting(notificationSetting);
      }
    });

  const handleTargetPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationSetting((prevSetting) => ({
      ...prevSetting,
      targetPrice: parseInt(event.target.value, 10),
    }));
  };

  const handleVirtualCurrencyTypeChange = (
    event: SelectChangeEvent<string>
  ) => {
    setNotificationSetting((prevSetting) => ({
      ...prevSetting,
      virtualCurrencyType: event.target.value,
    }));
  };

  const handleLineTokenChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationSetting((prevSetting) => ({
      ...prevSetting,
      lineToken: event.target.value,
    }));
  };

  const handleSettingSaveButton = async () => {
    const result = await validateAndSaveSettings(notificationSetting);
    if (result.validationErrors) {
      setValidationErrors(result.validationErrors);
    }
    setSnackbarInfomation(result.message);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        通知設定
      </Typography>
      目標価格を超えるとLINEへの通知が送られます
      {!isNotificationSettingLoading && !isVirtualCurrencyLoading && (
        <div>
          <FormControl fullWidth margin="normal">
            <InputLabel id="virtual-currency-type-label">指定通貨</InputLabel>
            <Select
              labelId="virtual-currency-type-label"
              value={notificationSetting.virtualCurrencyType}
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
            value={notificationSetting.targetPrice}
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
            value={notificationSetting.lineToken}
            onChange={handleLineTokenChange}
            error={!!validationErrors.lineToken}
            helperText={validationErrors.lineToken}
          />

          {(isNotificationSettingError || isVirtualCurrencyError) && (
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
                  setInfomation: setSnackbarInfomation,
                  price: virtualCurrencyTradingPrice?.last,
                })
              }
            >
              LINEに通知テスト
            </Button>
          </Box>

          {snackbarInfomation && (
            <Box mt={2}>
              <Alert severity="success">{snackbarInfomation}</Alert>
            </Box>
          )}
        </div>
      )}
    </Container>
  );
}

export default NotificationSetting;
