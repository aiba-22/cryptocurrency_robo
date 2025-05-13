import { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSaveGmoSetting } from "../../feature/hooks/useSaveGmoSetting";
import { useFindGmoSetting } from "../../feature/hooks/useFindGmoSetting";
import { Snackbar } from "../snackBar";
import { Loading } from "../loading";
import {
  GMO_SETTING_MESSAGES,
  isGmoSettingStatus,
} from "../../feature/gmoSetting/gmoSettingMessages";

type Form = {
  id: number;
  apiKey: string;
  secretKey: string;
};

export const GmoSetting = () => {
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      apiKey: "",
      secretKey: "",
    },
  });

  const { gmoSetting, isGmoSettingFindError, isGmoSettingFindLoading } =
    useFindGmoSetting();
  const { saveGmoSetting, gmoSettingSaveStatus } = useSaveGmoSetting();

  const onSubmit = (formData: Form) => {
    saveGmoSetting(formData);
  };

  useEffect(() => {
    if (gmoSetting) reset(gmoSetting);
  }, [gmoSetting, reset]);

  useEffect(() => {
    if (isGmoSettingFindError) {
      setSnackBarMessage(GMO_SETTING_MESSAGES.systemError);
      return;
    }
    if (gmoSettingSaveStatus && isGmoSettingStatus(gmoSettingSaveStatus)) {
      setSnackBarMessage(GMO_SETTING_MESSAGES[gmoSettingSaveStatus]);
    }
  }, [gmoSettingSaveStatus, isGmoSettingFindError]);

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
