import React from 'react';
import SignUp from './components/page1/SignUp';
import ChoosePage from './components/page2/ChoosePage';
import AcccountPage from "./components/Page3/AccountPage"
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
