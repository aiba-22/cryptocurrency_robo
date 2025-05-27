import "./App.css";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { PriceAlertSetting } from "./components/PriceAlertSetting";

import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import { AutomaticTradingSetting } from "./components/automaticTrading/AutomaticTradingSetting";
import { ServiceSettingsContainer } from "./components/serviceSetting/ServiceSettingsContainer";

export default function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            component={RouterLink}
            to="/priceAlertSetting"
          >
            価格アラート
          </Button>
          <Button color="inherit" component={RouterLink} to="/automaticTrading">
            自動取引
          </Button>
          <Button color="inherit" component={RouterLink} to="/setting">
            各種設定
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Box my={4}>
          <Routes>
            <Route path="/priceAlertSetting" element={<PriceAlertSetting />} />
            <Route
              path="/automaticTrading"
              element={<AutomaticTradingSetting />}
            />
            <Route path="/setting" element={<ServiceSettingsContainer />} />
          </Routes>
        </Box>
      </Container>
    </div>
  );
}
