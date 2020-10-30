import React from 'react';
import InputImage from './InputImage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Image converter to Ascii
      </header>
      <div className="App-content">
        <InputImage />
      </div>
      <footer className="App-footer">
          Made by Guillaume Gomez
      </footer>
    </div>
  );
}

export default App;
