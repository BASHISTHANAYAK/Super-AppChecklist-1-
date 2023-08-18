import React from 'react';
import SignUp from './components/SignUp';
import ChoosePage from './components/ChoosePage';
import AcccountPage from "./components/AccountPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/ChoosePage" element={<ChoosePage />} />
        <Route path="/AcccountPage" element={<AcccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
