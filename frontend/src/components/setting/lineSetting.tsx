import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SnackBer from "../snackBer";
import { useFindLineSetting } from "../../feature/hooks/useFindLineSetting";
import { useLineNotification } from "../../feature/hooks/useNotificationLine";
import { useSaveLineSetting } from "../../feature/hooks/useSaveLineSetting";

function LineSetting() {
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lineToken: "",
      userId: "",
    },
  });

  const { notificationSetting, isNotificationLoading } = useFindLineSetting();
  const { resultCodeOfNotification, sendNotification } = useLineNotification();
  const { resultCodeOfSave, saveSettings } = useSaveLineSetting();

  const onSubmit = async (form: {
    id?: number;
    lineToken: string;
    userId: string;
  }) => {
    saveSettings(form);
  };
  const notificationLine = async () => {
    sendNotification("テスト通知");
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
        LINE設定
      </Typography>
      {!isNotificationLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
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
              保存
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSubmit(notificationLine)}
            >
              通知テスト
            </Button>
          </Box>

          {snackBarMessage && <SnackBer message={snackBarMessage} />}
        </form>
      )}
    </Container>
  );
}

export default LineSetting;
