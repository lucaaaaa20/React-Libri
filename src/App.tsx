import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { FormLibro } from './Components/FormLibro';

function App() {
  return (
    <div className="App">
      <h1>Titolo</h1>
      <FormLibro></FormLibro>
    </div>
  );
}

export default App;