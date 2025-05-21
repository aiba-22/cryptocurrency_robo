import "./App.css";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { PriceAlertSetting } from "./components/priceAlertSetting";
import { AutomaticTrading } from "./components/automaticTrading/automaticTrading";

import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import { Setting } from "./components/setting/setting";

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
            <Route path="/automaticTrading" element={<AutomaticTrading />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </Box>
      </Container>
    </div>
  );
}
