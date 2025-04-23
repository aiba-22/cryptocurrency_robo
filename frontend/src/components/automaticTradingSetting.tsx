import { useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSaveGmoSetting } from "../feature/hooks/gmo/useSaveSetting";
import { useGmoSetting } from "../feature/hooks/gmo/useSetting";

type Form = {
  id: number;
  apiKey: string;
  secretKey: string;
};

const AutomaticTradingSetting = () => {
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

  const { data, isError, isLoading, errorMessage } = useGmoSetting();
  const { resultMessage, saveSetting } = useSaveGmoSetting();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = async (formData: Form) => {
    saveSetting(formData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        APIキー設定
      </Typography>

      <Typography variant="body1" gutterBottom>
        GMOの自動取引用APIキーを入力してください。
      </Typography>

      {isError && <Alert severity="error">設定の取得に失敗しました。</Alert>}

      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="apiKey"
            control={control}
            rules={{ required: "APIキーを入力してください" }}
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
            rules={{ required: "シークレットキーを入力してください" }}
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
              設定を保存
            </Button>
          </Box>

          {(resultMessage || errorMessage) && (
            <Box mt={2}>
              <Alert severity="info">{resultMessage || errorMessage}</Alert>
            </Box>
          )}
        </form>
      )}
    </Container>
  );
};

export default AutomaticTradingSetting;
