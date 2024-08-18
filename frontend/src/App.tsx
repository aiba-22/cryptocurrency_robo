import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
<<<<<<< HEAD
import CryptoPriceInformation from "./components/cryptoPriceInformation";
import NotificationSettings from "./components/notificationSettings";
=======
import Page01 from "./components/page01";
import Page02 from "./components/page02";
>>>>>>> master

export default function App() {
  return (
    <div className="App">
<<<<<<< HEAD
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
=======
      <Link to="page01">PAGE1</Link>
      <br />
      <Link to="page02">PAGE2</Link>

      <Routes>
        <Route path="/page01" element={<Page01 />} />
        <Route path="/page02" element={<Page02 />} />
>>>>>>> master
      </Routes>
    </div>
  );
}
