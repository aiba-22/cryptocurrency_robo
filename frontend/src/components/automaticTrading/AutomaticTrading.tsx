import { Container, Typography } from "@mui/material";
import { RepeatTrading } from "./RepeatTrading";
import { useTranslation } from "react-i18next";
import { AdjustmentTrading } from "./AdjustmentTrading";

export const AutomaticTrading = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "automaticTrading",
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>
      <RepeatTrading />
      <AdjustmentTrading />
    </Container>
  );
};
