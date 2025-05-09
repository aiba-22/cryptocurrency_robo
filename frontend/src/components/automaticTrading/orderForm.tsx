import { DoDisturbSharp } from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";

export type Form = {
  symbol: string;
  buy: {
    id?: number;
    targetPrice: number;
    volume: number;
    isEnabled: number;
  };
  sell: {
    id?: number;
    targetPrice: number;
    volume: number;
    isEnabled: number;
  };
};

type OrderFormProps = {
  control: Control<Form>;
  errors: FieldErrors<Form>;
  targetPriceField: "buy.targetPrice" | "sell.targetPrice";
  quantityField: "buy.volume" | "sell.volume";
  labelPrefix: string;
};
function OrderForm({
  control,
  errors,
  targetPriceField,
  quantityField,
}: OrderFormProps) {
  const priceError =
    targetPriceField === "buy.targetPrice"
      ? errors.buy?.targetPrice
      : targetPriceField === "sell.targetPrice"
      ? errors.sell?.targetPrice
      : undefined;

  const quantityError =
    quantityField === "buy.volume"
      ? errors.buy?.volume
      : quantityField === "sell.volume"
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
            name={quantityField}
            control={control}
            rules={{ required: "入力必須項目です" }}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value}
                label="数量"
                type="number"
                fullWidth
                error={!!quantityError}
                helperText={quantityError?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default OrderForm;
