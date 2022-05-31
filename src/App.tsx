import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { FormLibro } from './Components/FormLibro';
import './App.css';

function App() {
  return (
    <div className="App container">
      <h1 className="my-3">LIBRERIA</h1>
      <FormLibro></FormLibro>
    </div>
  );
}

export default App;