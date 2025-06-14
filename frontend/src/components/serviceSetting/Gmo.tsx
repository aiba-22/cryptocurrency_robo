import { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Snackbar } from "../SnackBar";
import { Loading } from "../Loading";
import { useTranslation } from "react-i18next";
import { useFindGmoSetting } from "../../feature/gmo/hooks/useFindGmoSetting";
import { useSaveGmoSetting } from "../../feature/gmo/hooks/useSaveGmoSetting";

type GmoSettingForm = {
  id: number;
  apiKey: string;
  secretKey: string;
};

export const GmoSetting = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "gmo",
  });

  const [snackBarMessage, setSnackBarMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GmoSettingForm>({
    defaultValues: {
      apiKey: "",
      secretKey: "",
    },
  });

  const { gmoSetting, isGmoSettingFindError, isGmoSettingFindLoading } =
    useFindGmoSetting();

  const { saveGmoSetting, gmoSettingSaveStatus } = useSaveGmoSetting();

  const onSubmit = (form: GmoSettingForm) => {
    saveGmoSetting(form);
  };

  useEffect(() => {
    if (gmoSetting) reset(gmoSetting);
  }, [gmoSetting, reset]);

  useEffect(() => {
    if (isGmoSettingFindError) {
      setSnackBarMessage(t("findSetting.systemError"));
    }
  }, [isGmoSettingFindError, t]);

  useEffect(() => {
    if (gmoSettingSaveStatus) {
      setSnackBarMessage(
        t(`save.${gmoSettingSaveStatus}`, {
          defaultValue: t("systemError"),
        })
      );
    }
  }, [gmoSettingSaveStatus, t]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>

      {isGmoSettingFindLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="apiKey"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label={t("form.apiKeyLabel")}
                type="password"
                error={!!errors.apiKey}
                helperText={errors.apiKey?.message}
              />
            )}
          />

          <Controller
            name="secretKey"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label={t("form.secretKeyLabel")}
                type="password"
                error={!!errors.secretKey}
                helperText={errors.secretKey?.message}
              />
            )}
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              {t("form.saveButton")}
            </Button>
          </Box>
        </form>
      )}

      {snackBarMessage && <Snackbar message={snackBarMessage} />}
    </Container>
  );
};
