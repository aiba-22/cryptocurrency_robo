import { Container, Typography, Box } from "@mui/material";

export type Cryptocurrencyrate = {
  last?: number;
  bid?: number;
  ask?: number;
  high?: number;
  low?: number;
  volume?: number;
  timestamp?: Date;
};

function Rate({ cryptocurrency }: { cryptocurrency: Cryptocurrencyrate }) {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        現在のレート情報
      </Typography>

      <Box mt={2}>
        <Typography variant="h6">価格詳細</Typography>
        <Typography>最終価格: {cryptocurrency.last}</Typography>
        <Typography>買い価格: {cryptocurrency.bid}</Typography>
        <Typography>売り価格: {cryptocurrency.ask}</Typography>
        <Typography>高値: {cryptocurrency.high}</Typography>
        <Typography>安値: {cryptocurrency.low}</Typography>
        <Typography>取引量: {cryptocurrency.volume}</Typography>
      </Box>
    </Container>
  );
}

export default Rate;
