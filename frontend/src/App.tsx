import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import CryptoPriceInformation from "./components/cryptoPriceInformation";
import NotificationSettings from "./components/notificationSettings";

export default function App() {
  return (
    <div className="App">
      <Link to="cryptoPriceInformation">価格情報</Link>
      <br />
      <Link to="notificationSettings">通知設定</Link>

      <Routes>
        <Route
          path="/cryptoPriceInformation"
          element={<CryptoPriceInformation />}
        />
        <Route
          path="/notificationSettings"
          element={<NotificationSettings />}
        />
      </Routes>
    </div>
  );
}
