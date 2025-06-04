import { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSaveGmoSetting } from "../../feature/hooks/useSaveGmoSetting";
import { useFindGmoSetting } from "../../feature/hooks/useFindGmoSetting";
import { Snackbar } from "../SnackBar";
import { Loading } from "../Loading";
import { useTranslation } from "react-i18next";

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
      setSnackBarMessage(t(`save.${gmoSettingSaveStatus}`));
    }
  }, [gmoSettingSaveStatus, t]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        GMO設定
      </Typography>
      {isGmoSettingFindLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="apiKey"
            control={control}
            rules={{ required: "必須項目です" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="APIキー"
                type="password"
                error={!!errors.apiKey}
                helperText={errors.apiKey?.message}
              />
            )}
          />
          <Controller
            name="secretKey"
            control={control}
            rules={{ required: "必須項目です" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="シークレットキー"
                type="password"
                error={!!errors.secretKey}
                helperText={errors.secretKey?.message}
              />
            )}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              保存
            </Button>
          </Box>
        </form>
      )}
      {snackBarMessage && <Snackbar message={snackBarMessage} />}
    </Container>
  );
};
