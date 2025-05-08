import { DoDisturbSharp } from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";

export type Form = {
  symbol: string;
  buy: {
    id?: number;
    price: number;
    quantity: number;
    isEnabled: number;
  };
  sell: {
    id?: number;
    price: number;
    quantity: number;
    isEnabled: number;
  };
};

type Props = {
  control: Control<Form>;
  errors: FieldErrors<Form>;
  priceField: "buy.price" | "sell.price";
  quantityField: "buy.quantity" | "sell.quantity";
  labelPrefix: string;
};
function OrderForm({ control, errors, priceField, quantityField }: Props) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name={priceField}
            control={control}
            rules={{ required: "入力必須項目です" }}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                label="価格"
                type="number"
                fullWidth
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
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                label="数量"
                type="number"
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default OrderForm;
