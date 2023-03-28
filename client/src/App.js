import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Info from './components/Info';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/Info' element={<Info />} />
        <Route path='/Navbar' element={<Navbar />} />
      </Routes>
      
    </div>
  );
}

export default App;
