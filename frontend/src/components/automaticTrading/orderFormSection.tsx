import { Grid, TextField } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";

export type Form = {
  symbol: string;
  buyId?: number;
  buyPrice: number;
  buyQuantity: number;
  isBuyEnabled: boolean;
  sellId?: number;
  sellPrice: number;
  sellQuantity: number;
  isSellEnabled: boolean;
};

type Props = {
  control: Control<Form>;
  errors: FieldErrors<Form>;
  enabledField: "isBuyEnabled" | "isSellEnabled";
  priceField: "buyPrice" | "sellPrice";
  quantityField: "buyQuantity" | "sellQuantity";
  labelPrefix: string;
};

function OrderFormSection({
  control,
  errors,
  priceField,
  quantityField,
}: Props) {
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
                error={!!errors.buyPrice}
                helperText={errors.buyPrice?.message}
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
                error={!!errors.buyQuantity}
                helperText={errors.buyQuantity?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default OrderFormSection;
