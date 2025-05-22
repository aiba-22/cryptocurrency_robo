import { Grid, TextField } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { OrderFormValues } from "../../feature/automaticTrading/hooks/useOrderForm";

type OrderFormProps = {
  control: Control<OrderFormValues>;
  errors: FieldErrors<OrderFormValues>;
  targetPriceField: "buy.targetPrice" | "sell.targetPrice";
  volumeField: "buy.volume" | "sell.volume";
  labelPrefix: string;
};
export const OrderForm: React.FC<OrderFormProps> = ({
  control,
  errors,
  targetPriceField,
  volumeField,
}) => {
  const priceError =
    targetPriceField === "buy.targetPrice"
      ? errors.buy?.targetPrice
      : targetPriceField === "sell.targetPrice"
      ? errors.sell?.targetPrice
      : undefined;

  const volumeError =
    volumeField === "buy.volume"
      ? errors.buy?.volume
      : volumeField === "sell.volume"
      ? errors.sell?.volume
      : undefined;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name={targetPriceField}
            control={control}
            rules={{ required: "入力必須項目です" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="価格"
                type="number"
                fullWidth
                error={!!priceError}
                helperText={priceError?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name={volumeField}
            control={control}
            rules={{ required: "入力必須項目です" }}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value}
                label="数量"
                type="number"
                fullWidth
                error={!!volumeError}
                helperText={volumeError?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
