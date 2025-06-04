import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Snackbar } from "../SnackBar";
import { useFindLineSetting } from "../../feature/hooks/useFindLineSetting";
import { useLineNotification } from "../../feature/hooks/useNotificationLine";
import { useSaveLineSetting } from "../../feature/hooks/useSaveLineSetting";
import { Loading } from "../Loading";
import { useTranslation } from "react-i18next";

type LineForm = {
  id?: number;
  channelAccessToken: string;
  lineUserId: string;
};

export const LineSetting = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "line",
  });

  const [snackBarMessage, setSnackBarMessage] = useState("");

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LineForm>({
    defaultValues: {
      channelAccessToken: "",
      lineUserId: "",
    },
  });

  const { lineSetting, isLineSettingFindError, isLineSettingFindLoading } =
    useFindLineSetting();
  const {
    sendNotification,
    notificationSendStatus,
    setNotificationSendStatus,
  } = useLineNotification();
  const { saveLineSettings, lineSettingSaveStatus, setAlertSettingSaveStatus } =
    useSaveLineSetting();

  const onSubmit = (form: LineForm) => {
    saveLineSettings(form);
  };

  const handleSendButtonClick = () => {
    sendNotification("通知テスト");
  };

  useEffect(() => {
    if (lineSetting) reset(lineSetting);
  }, [lineSetting, reset]);

  useEffect(() => {
    if (isLineSettingFindError) {
      setSnackBarMessage(t("findSetting.systemError"));
    }
  }, [isLineSettingFindError, t]);

  useEffect(() => {
    if (lineSettingSaveStatus) {
      setSnackBarMessage(t(`save.${lineSettingSaveStatus}`));
      setAlertSettingSaveStatus(undefined);
    }
  }, [lineSettingSaveStatus, setAlertSettingSaveStatus, t]);

  useEffect(() => {
    if (notificationSendStatus) {
      setSnackBarMessage(t(`notification.${notificationSendStatus}`));
      setNotificationSendStatus(undefined);
    }
  }, [notificationSendStatus, setNotificationSendStatus, t]);

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
            name="lineUserId"
            control={control}
            rules={{ required: "入力必須項目です" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="LINEユーザーID"
                type="password"
                error={!!errors.lineUserId}
                helperText={errors.lineUserId?.message}
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
              onClick={handleSendButtonClick}
            >
              通知テスト
            </Button>
          </Box>
        </form>
      )}

      {snackBarMessage && <Snackbar message={snackBarMessage} />}
    </Container>
  );
};
