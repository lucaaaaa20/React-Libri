import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { FormLibro } from './Components/FormLibro';
import { ListaLibri } from './Components/ListaLibri';
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './Components/NavBar';
import './App.css';

function App() {
  return (
    <>
    <NavBar></NavBar>
    <div className="App container">
      <Routes>
        <Route path="/" element={<FormLibro/>}/>
        <Route path="/form" element={<FormLibro/>}/>
        <Route path="/lista-card" element={<ListaLibri/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;