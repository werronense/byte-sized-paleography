import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>landing page</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
