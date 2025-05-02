import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSaveGmoSetting } from "../../feature/hooks/useSaveGmoSetting";
import { useFindGmoSetting } from "../../feature/hooks/useFindGmoSetting";
import SnackBer from "../snackBer";

type Form = {
  id: number;
  apiKey: string;
  secretKey: string;
};

function GmoSetting() {
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      id: 1,
      apiKey: "",
      secretKey: "",
    },
  });

  const { data, isError, isLoading } = useFindGmoSetting();
  const { resultCodeOfSave, saveSetting } = useSaveGmoSetting();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = async (formData: Form) => {
    saveSetting(formData);
  };

  useEffect(() => {
    const message =
      resultCodeOfSave.code === "successSaveGmoSetting"
        ? "APIキーの保存に成功しました。"
        : resultCodeOfSave.code === "errorSaveGmoSetting"
        ? "APIキーの保存に失敗しました"
        : "";

    setSnackBarMessage(message);
  }, [resultCodeOfSave, setSnackBarMessage]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        GMO設定
      </Typography>

      {isError && <Alert severity="error">設定の取得に失敗しました。</Alert>}

      {!isLoading && (
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
      {snackBarMessage && <SnackBer message={snackBarMessage} />}
    </Container>
  );
}

export default GmoSetting;
