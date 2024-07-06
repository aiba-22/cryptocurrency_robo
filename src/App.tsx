import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Page01 from "./components/page01";
import Page02 from "./components/page02";

export default function App() {
  return (
    <div className="App">
      <Link to="page01">PAGE1</Link>
      <br />
      <Link to="page02">PAGE2</Link>

      <Routes>
        <Route path="/page01" element={<Page01 />} />
        <Route path="/page02" element={<Page02 />} />
      </Routes>
    </div>
  );
}
