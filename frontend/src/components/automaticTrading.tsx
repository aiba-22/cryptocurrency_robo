import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

type Form = {
  buyPrice: number;
  buyQuantity: number;
  sellPrice: number;
  SellQuantity: number;
  enableBuying: boolean;
  enableSelling: boolean;
};

const AutomaticTrading = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      buyPrice: 0,
      buyQuantity: 0,
      sellPrice: 0,
      SellQuantity: 0,
      enableBuying: true,
      enableSelling: true,
    },
  });

  const enableBuying = watch("enableBuying");
  const enableSelling = watch("enableSelling");

  const onSubmit = (data: Form) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        自動売買設定
      </Typography>

      <Typography variant="body1" gutterBottom>
        購入・売却の価格と数量を入力してください。
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 買い注文設定 */}
        <Box mb={2} display="flex" justifyContent="flex-start">
          <Controller
            name="enableBuying"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="買い注文を設定する"
              />
            )}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="buyPrice"
              control={control}
              rules={
                enableBuying
                  ? { required: "購入価格を入力してください" }
                  : undefined
              }
              render={({ field }) => (
                <TextField
                  {...field}
                  label="購入価格"
                  type="number"
                  fullWidth
                  disabled={!enableBuying}
                  error={!!errors.buyPrice}
                  helperText={errors.buyPrice?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="buyQuantity"
              control={control}
              rules={
                enableBuying
                  ? { required: "購入数量を入力してください" }
                  : undefined
              }
              render={({ field }) => (
                <TextField
                  {...field}
                  label="購入数量"
                  type="number"
                  fullWidth
                  disabled={!enableBuying}
                  error={!!errors.buyQuantity}
                  helperText={errors.buyQuantity?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* 売り注文設定 */}
        <Box mb={2} display="flex" justifyContent="flex-start">
          <Controller
            name="enableSelling"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="売り注文を設定する"
              />
            )}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="sellPrice"
              control={control}
              rules={
                enableSelling
                  ? { required: "売値を入力してください" }
                  : undefined
              }
              render={({ field }) => (
                <TextField
                  {...field}
                  label="売値"
                  type="number"
                  fullWidth
                  disabled={!enableSelling}
                  error={!!errors.sellPrice}
                  helperText={errors.sellPrice?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="SellQuantity"
              control={control}
              rules={
                enableSelling
                  ? { required: "売り数量を入力してください" }
                  : undefined
              }
              render={({ field }) => (
                <TextField
                  {...field}
                  label="売り数量"
                  type="number"
                  fullWidth
                  disabled={!enableSelling}
                  error={!!errors.SellQuantity}
                  helperText={errors.SellQuantity?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">
            注文を送信
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AutomaticTrading;
