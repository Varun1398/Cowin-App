import "./App.css";
import ConfirmOTP from "./Components/ConfirmOTP";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import DownloadCertificate from "./Components/DownloadCertificate";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/confirmotp" element={<ConfirmOTP />} />
      <Route exact path="/downloadcertificate" element={<DownloadCertificate />} />

    </Routes>
  );
}

export default App;
