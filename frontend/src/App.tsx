import "./App.css";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import CryptoPriceInformation from "./components/cryptoPriceInformation";
import NotificationSetting from "./components/notificationSetting";
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
            to="/cryptoPriceInformation"
          >
            価格情報
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/notificationSetting"
          >
            通知設定
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Box my={4}>
          <Routes>
            <Route
              path="/cryptoPriceInformation"
              element={<CryptoPriceInformation />}
            />
            <Route
              path="/notificationSetting"
              element={<NotificationSetting />}
            />
          </Routes>
        </Box>
      </Container>
    </div>
  );
}
