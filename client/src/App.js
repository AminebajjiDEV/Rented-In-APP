import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
