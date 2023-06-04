import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Location from "./pages/Location";
import AppSession from "./pages/AppSession";
import WeblinkTraffic from "./pages/WeblinkTraffic";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/location" element={<Location />} />
        <Route path="/apps" element={<AppSession />} />
        <Route path="/weblink" element={<WeblinkTraffic />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
