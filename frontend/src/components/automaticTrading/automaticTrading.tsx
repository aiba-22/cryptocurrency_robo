import { Alert, Box, Container } from "@mui/material";
import GmoSetting from "./gmoSetting";
import OrderSetting from "./orderSetting";
import { useState } from "react";

const AutomaticTrading = () => {
  const [snackBarMessage, setSnackBarMessage] = useState("");
  return (
    <Container maxWidth="sm">
      <GmoSetting setSnackBarMessage={setSnackBarMessage} />
      <OrderSetting setSnackBarMessage={setSnackBarMessage} />
      {snackBarMessage && (
        <Box mt={2}>
          <Alert severity="info">{snackBarMessage}</Alert>
        </Box>
      )}
    </Container>
  );
};

export default AutomaticTrading;
