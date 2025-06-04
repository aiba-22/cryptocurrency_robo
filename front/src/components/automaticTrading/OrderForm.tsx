import { Grid, TextField } from "@mui/material";
import { Controller, type Control } from "react-hook-form";
import type { CryptocurrencyOrderForm } from "../../feature/automaticTrading/hooks/useOrderForm";

type OrderFormProps = {
  control: Control<CryptocurrencyOrderForm>;
  priceErrorMessage?: string;
  volumeErrorMessage?: string;
  targetPriceField: "buy.targetPrice" | "sell.targetPrice";
  volumeField: "buy.volume" | "sell.volume";
  labelPrefix: string;
};

export const OrderForm: React.FC<OrderFormProps> = ({
  control,
  priceErrorMessage,
  volumeErrorMessage,
  targetPriceField,
  volumeField,
}) => {
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
                error={!!priceErrorMessage}
                helperText={priceErrorMessage}
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
                error={!!volumeErrorMessage}
                helperText={volumeErrorMessage}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
