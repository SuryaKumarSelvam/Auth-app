import React from 'react';
import './App.css';
import { RegistrationPage } from './auth/RegistrationPage';
import Sign from './auth/Sign';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<RegistrationPage/>} />
        <Route index path='/'  element={<Sign/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
