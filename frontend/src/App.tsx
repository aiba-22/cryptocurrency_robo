import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import CryptoPriceViewer from "./components/cryptoPriceViewer";
import NotificationSettings from "./components/notificationSettings";

export default function App() {
  return (
    <div className="App">
      <Link to="cryptoPriceViewer">価格情報</Link>
      <br />
      <Link to="notificationSettings">通知設定</Link>

      <Routes>
        <Route path="/cryptoPriceViewer" element={<CryptoPriceViewer />} />
        <Route
          path="/notificationSettings"
          element={<NotificationSettings />}
        />
      </Routes>
    </div>
  );
}
