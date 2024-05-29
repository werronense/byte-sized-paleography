import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>landing page</p>} />
        <Route path="/register" element={<p>registration page</p>} />
        <Route path="/login" element={<p>login page</p>} />
        <Route path="/profile" element={<p>profile page</p>} />
        <Route path="/update-profile" element={<p>update profile page</p>} />
        <Route path="/transcribe" element={<p>transcribe page</p>} />
        <Route path="*" element={<p>404 Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
