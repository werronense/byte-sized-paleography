import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";

import Header from "./components/Header/Header";

import LandingPage from "./pages/LandingPage/LandingPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage/UpdateProfilePage";
import TranscriptionPage from "./pages/TranscriptionPage/TranscriptionPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/update-profile" element={<UpdateProfilePage />} />
        <Route path="/transcribe" element={<TranscriptionPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
