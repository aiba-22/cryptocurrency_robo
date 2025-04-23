import "./App.css";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import CryptocurrencyRate from "./components/cryptocurrencyRate";
import PrieAlertSetting from "./components/priceAlertSetting";
import AutomaticTrading from "./components/automaticTrading";
import AutomaticTradingSetting from "./components/automaticTradingSetting";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";

export default function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            仮想通貨トラッカー
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/cryptocurrencyRate"
          >
            価格情報
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/priceAlertSetting"
          >
            通知設定
          </Button>
          <Button color="inherit" component={RouterLink} to="/automaticTrading">
            自動取引
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/automaticTradingSetting"
          >
            自動取引設定
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Box my={4}>
          <Routes>
            <Route
              path="/cryptocurrencyRate"
              element={<CryptocurrencyRate />}
            />
            <Route path="/priceAlertSetting" element={<PrieAlertSetting />} />
            <Route path="/automaticTrading" element={<AutomaticTrading />} />
            <Route
              path="/automaticTradingSetting"
              element={<AutomaticTradingSetting />}
            />
          </Routes>
        </Box>
      </Container>
    </div>
  );
}
