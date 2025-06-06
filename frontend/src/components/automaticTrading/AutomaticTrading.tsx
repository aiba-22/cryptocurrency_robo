import { Container, Typography, Box, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StaticOrderTradingForm } from "./staticTrading/StaticOrderTradingForm";
import { AdjustmentTradingForm } from "./adjustmentTrading/AdjustmentTradingForm";

export const AutomaticTrading = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "automaticTrading",
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>
      <Box display="flex" gap={4} flexWrap="wrap" mt={2}>
        <Paper elevation={3} sx={{ flex: 1, minWidth: 300, p: 2 }}>
          <StaticOrderTradingForm />
        </Paper>
        <Paper elevation={3} sx={{ flex: 1, minWidth: 300, p: 2 }}>
          <AdjustmentTradingForm />
        </Paper>
      </Box>
    </Container>
  );
};
