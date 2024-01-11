import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './Login.css';
import './Signin.css';

import Home from './components/Home';
import Login from './components/Login';
import Signin from './components/Signin';
import Search from './components/Search';
import Userdash from './components/Userdash';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route path='/search' element={<Search/>}/>
        <Route path='/userdash/:username' element={<Userdash/>}/>
      </Routes>
    </div>
  );
}

export default App;
