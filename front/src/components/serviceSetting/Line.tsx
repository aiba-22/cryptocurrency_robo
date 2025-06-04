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
    sendNotification(t("form.testMessage"));
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
      setSnackBarMessage(
        t(`save.${lineSettingSaveStatus}`, {
          defaultValue: t("systemError"),
        })
      );
      setAlertSettingSaveStatus(undefined);
    }
  }, [lineSettingSaveStatus, setAlertSettingSaveStatus, t]);

  useEffect(() => {
    if (notificationSendStatus) {
      setSnackBarMessage(
        t(`notification.${notificationSendStatus}`, {
          defaultValue: t("systemError"),
        })
      );
      setNotificationSendStatus(undefined);
    }
  }, [notificationSendStatus, setNotificationSendStatus, t]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>

      {isLineSettingFindLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="channelAccessToken"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label={t("form.tokenLabel")}
                type="password"
                error={!!errors.channelAccessToken}
                helperText={errors.channelAccessToken?.message}
              />
            )}
          />

          <Controller
            name="lineUserId"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label={t("form.userIdLabel")}
                type="password"
                error={!!errors.lineUserId}
                helperText={errors.lineUserId?.message}
              />
            )}
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              {t("form.saveButton")}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSendButtonClick}
            >
              {t("form.testButton")}
            </Button>
          </Box>
        </form>
      )}

      {snackBarMessage && <Snackbar message={snackBarMessage} />}
    </Container>
  );
};
