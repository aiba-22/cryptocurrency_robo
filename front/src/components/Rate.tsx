import { Container, Typography, Paper, Grid } from "@mui/material";
import { Snackbar } from "./SnackBar";
import { useEffect, useMemo, useState } from "react";
import { Loading } from "./Loading";
import { useTranslation } from "react-i18next";
import { useListCryptocurrencyRate } from "../feature/rate/hooks/useListCryptocurrencyRate";

export const Rate = ({ symbol }: { symbol: string }) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "rate",
  });

  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { cryptocurrencyRateMap, isRateListError, isRateListLoading } =
    useListCryptocurrencyRate();

  useEffect(() => {
    if (isRateListError) setSnackBarMessage(t("list.systemError"));
  }, [isRateListError, t]);

  const cryptocurrencyRate = useMemo(() => {
    const rate = cryptocurrencyRateMap?.get(symbol);
    if (!rate) return [];
    return [
      { label: "最終価格", value: rate.last },
      { label: "買い価格", value: rate.bid },
      { label: "売り価格", value: rate.ask },
      { label: "高値", value: rate.high },
      { label: "安値", value: rate.low },
      { label: "取引量", value: rate.volume },
    ];
  }, [cryptocurrencyRateMap, symbol]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        レート情報（{symbol}）
      </Typography>

      {isRateListLoading ? (
        <Loading />
      ) : cryptocurrencyRate.length > 0 ? (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={1}>
            {cryptocurrencyRate.map(({ label, value }) => (
              <Grid container key={label}>
                <Grid item xs={6}>
                  <Typography color="textSecondary">{label}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{value}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ) : (
        <Typography color="textSecondary">
          データが取得できませんでした。
        </Typography>
      )}

      {snackBarMessage && <Snackbar message={snackBarMessage} />}
    </Container>
  );
};
