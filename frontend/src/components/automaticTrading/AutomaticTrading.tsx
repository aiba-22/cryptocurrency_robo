import { Container, Typography } from "@mui/material";
import { StaticRepeatTrading } from "./StaticRepeatTrading";
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
      <StaticRepeatTrading />
      <AdjustmentTrading />
    </Container>
  );
};
