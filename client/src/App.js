import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import PropertyDetails from "./pages/PropertyDetails"
import TripList from "./pages/TripList"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listings/:listingId" element={<PropertyDetails />} />
          <Route path="/:userId/trips" element={<TripList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
