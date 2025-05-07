import { Container, Typography, Box } from "@mui/material";
import { useListCryptocurrencyRate } from "../feature/hooks/useListCryptocurrencyRate";
import { symbol } from "zod";
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
  }, [isRateListError, setSnackBarMessage]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        現在のレート情報
      </Typography>

      {isRateListLoading ? (
        <Loading />
      ) : (
        <Box mt={2}>
          <Typography variant="h6">価格詳細</Typography>
          <Typography>最終価格: {rate?.last}</Typography>
          <Typography>買い価格: {rate?.bid}</Typography>
          <Typography>売り価格: {rate?.ask}</Typography>
          <Typography>高値: {rate?.high}</Typography>
          <Typography>安値: {rate?.low}</Typography>
          <Typography>取引量: {rate?.volume}</Typography>
        </Box>
      )}
      {snackBarMessage && <SnackBer message={snackBarMessage} />}
    </Container>
  );
}

export default Rate;
