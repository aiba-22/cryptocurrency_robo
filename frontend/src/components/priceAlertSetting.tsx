import { useEffect, useState } from "react";
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

import { useFindPriceAlertSetting } from "../feature/hooks/useFindPriceAlertSetting";
import { CRYPTOCURRENCY_LIST } from "../feature/constants";
import { useLineNotification } from "../feature/hooks/useNotificationLine";
import { useSavePriceAlertSetting } from "../feature/hooks/useSavePriceAlertSetting";
import SnackBer from "./snackBer";

type Form = {
  id?: number;
  cryptocurrencyType: string;
  isUpperLimit: boolean;
  price: number;
  lineToken: string;
  userId: string;
};

function PrieAlertSetting() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      id: undefined,
      cryptocurrencyType: "",
      isUpperLimit: undefined,
      price: 0,
      lineToken: "",
      userId: "",
    },
  });
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { notificationSetting, isNotificationLoading } =
    useFindPriceAlertSetting();

  const { resultCodeOfSave, saveSettings } = useSavePriceAlertSetting();
  const { resultCodeOfNotification, sendNotification } = useLineNotification();

  const onSubmit = async (form: Form) => {
    saveSettings(form);
  };

  const notificationLine = async (form: Form) => {
    sendNotification(form.price);
  };

  useEffect(() => {
    if (notificationSetting) reset(notificationSetting);
  }, [notificationSetting, reset]);

  useEffect(() => {
    const message =
      resultCodeOfSave.code === "successSaveTargetPriceSetting"
        ? "保存に成功しました。"
        : resultCodeOfSave.code === "errorSaveTargetPriceSetting"
        ? "保存に失敗しました"
        : "";
    setSnackBarMessage(message);
  }, [resultCodeOfSave]);

  useEffect(() => {
    const message =
      resultCodeOfNotification.code === "successLineNotification"
        ? "テスト送信に成功しました。"
        : resultCodeOfNotification.code === "errorLineNotification"
        ? "テスト送信に失敗しました"
        : "";
    setSnackBarMessage(message);
  }, [resultCodeOfNotification]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        価格アラート
      </Typography>
      {!isNotificationLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="virtual-currency-type-label">指定通貨</InputLabel>
            <Controller
              name="cryptocurrencyType"
              control={control}
              rules={{ required: "入力必須項目です" }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="virtual-currency-type-label"
                  onChange={(e: SelectChangeEvent) =>
                    field.onChange(e.target.value)
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
            {errors.cryptocurrencyType && (
              <Alert severity="error">
                {errors.cryptocurrencyType.message}
              </Alert>
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
            rules={{ required: "入力必須項目です" }}
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
            rules={{ required: "入力必須項目です" }}
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

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              設定を保存
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSubmit(notificationLine)}
            >
              LINEに通知テスト
            </Button>
          </Box>

          {snackBarMessage && <SnackBer message={snackBarMessage} />}
        </form>
      )}
    </Container>
  );
}

export default PrieAlertSetting;
