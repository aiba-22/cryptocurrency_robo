import { Container, Typography, Box, Paper, Grid } from "@mui/material";
import { useListCryptocurrencyRate } from "../feature/hooks/useListCryptocurrencyRate";
import SnackBer from "./snackBer";
import { useEffect, useState } from "react";
import Loading from "./loading";

function Rate({ symbol }: { symbol: string }) {
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { cryptocurrencyRateMap, isRateListError, isRateListLoading } =
    useListCryptocurrencyRate();
  const rate = cryptocurrencyRateMap?.get(symbol);

  useEffect(() => {
    if (isRateListError) setSnackBarMessage("システムエラー");
  }, [isRateListError]);

  const formatNumber = (num: number | undefined) =>
    num?.toLocaleString("ja-JP", { maximumFractionDigits: 2 }) ?? "-";

  const rateEntries = rate
    ? [
        { label: "最終価格", value: rate.last },
        { label: "買い価格", value: rate.bid },
        { label: "売り価格", value: rate.ask },
        { label: "高値", value: rate.high },
        { label: "安値", value: rate.low },
        { label: "取引量", value: rate.volume },
      ]
    : [];
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        レート情報（{symbol}）
      </Typography>

      {isRateListLoading ? (
        <Loading />
      ) : rate ? (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={1}>
            {rateEntries.map(({ label, value }) => (
              <>
                <Grid item xs={6}>
                  <Typography color="textSecondary">{label}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{formatNumber(value)}</Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </Paper>
      ) : (
        <Typography color="textSecondary">
          データが取得できませんでした。
        </Typography>
      )}

      {snackBarMessage && <SnackBer message={snackBarMessage} />}
    </Container>
  );
}

export default Rate;
