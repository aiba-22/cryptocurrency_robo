import { Container } from "@mui/material";
import GmoSetting from "./gmoSetting";
import OrderSetting from "./orderSetting";
import { useState } from "react";
import SnackBer from "../snackBer";

function AutomaticTrading() {
  const [snackBarMessage, setSnackBarMessage] = useState("");
  return (
    <Container maxWidth="sm">
      <GmoSetting setSnackBarMessage={setSnackBarMessage} />
      <OrderSetting setSnackBarMessage={setSnackBarMessage} />
      <SnackBer message={snackBarMessage} />
    </Container>
  );
}

export default AutomaticTrading;
