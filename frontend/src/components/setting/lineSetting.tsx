import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SnackBer from "../snackBer";
import { useFindLineSetting } from "../../feature/hooks/useFindLineSetting";
import { useLineNotification } from "../../feature/hooks/useNotificationLine";
import { useSaveLineSetting } from "../../feature/hooks/useSaveLineSetting";
import Loading from "../loading";

function LineSetting() {
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      channelAccessToken: "",
      userId: "",
    },
  });

  const { lineSetting, isLineSettingFindError, isLineSettingFindLoading } =
    useFindLineSetting();
  const { sendNotification, notificationSendStatus } = useLineNotification();
  const { saveLineSettings, lineSettingSaveStatus } = useSaveLineSetting();

  const onSubmit = async (form: {
    id?: number;
    channelAccessToken: string;
    userId: string;
  }) => {
    saveLineSettings(form);
  };
  const notificationLine = () => {
    const message = "通知テスト";
    sendNotification(message);
  };

  useEffect(() => {
    if (lineSetting) reset(lineSetting);
  }, [lineSetting, reset]);

  useEffect(() => {
    if (lineSettingSaveStatus === "success") {
      setSnackBarMessage("保存に成功しました。");
    }
    if (lineSettingSaveStatus === "error") {
      setSnackBarMessage("保存に失敗しました。");
    }
  }, [lineSettingSaveStatus, setSnackBarMessage]);

  useEffect(() => {
    if (!notificationSendStatus) return;

    switch (notificationSendStatus) {
      case "success":
        setSnackBarMessage("テスト送信に成功しました。");
        break;
      case "tooManyRequests":
        setSnackBarMessage(
          "メッセージの送信可能件数（月200件）を超過しました。"
        );
        break;
      case "badRequest":
        setSnackBarMessage("トークン情報が誤っています。");
        break;
      case "systemError":
        setSnackBarMessage("システムエラー");
        break;
    }
  }, [notificationSendStatus, setSnackBarMessage]);

  useEffect(() => {
    if (isLineSettingFindError) setSnackBarMessage("システムエラー");
  }, [isLineSettingFindError, setSnackBarMessage]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        LINE設定
      </Typography>
      {isLineSettingFindLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="channelAccessToken"
            control={control}
            rules={{ required: "入力必須項目です" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="LINEトークン"
                type="password"
                error={!!errors.channelAccessToken}
                helperText={errors.channelAccessToken?.message}
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
        </form>
      )}
      {snackBarMessage && <SnackBer message={snackBarMessage} />}
    </Container>
  );
}

export default LineSetting;
