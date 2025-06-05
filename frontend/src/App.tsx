// import "./App.css";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { PriceAlert } from "./components/PriceAlert";

import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import { AutomaticTrading } from "./components/automaticTrading/AutomaticTrading";
import { ServiceSettingsContainer } from "./components/serviceSetting/ServiceSettingsContainer";

export default function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={RouterLink} to="/priceAlert">
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
            <Route path="/priceAlert" element={<PriceAlert />} />
            <Route path="/automaticTrading" element={<AutomaticTrading />} />
            <Route path="/setting" element={<ServiceSettingsContainer />} />
          </Routes>
        </Box>
      </Container>
    </div>
  );
}
