import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './layouts/home';
import Datasensor from './layouts/datasensor';
import History from './layouts/history';
import Profile from './layouts/profile';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/datasensor' element={<Datasensor/>} />
      <Route path='/history' element={<History/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path="*" element={<Navigate to="" />} />
    </Routes>
  );
}

export default App;
