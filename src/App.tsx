import React from 'react';
import ImageConverterToAscii from './ImageConverterToAscii';
import GitHubButton from 'react-github-btn'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Image converter to Ascii
      </header>
      <div className="App-content">
        <ImageConverterToAscii />
      </div>
      <footer className="App-footer">
        Made by Guillaume Gomez
        <GitHubButton 
          href="https://github.com/guillaume-gomez/image-to-ascii"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          aria-label="Star guillaume-gomez/image-to-ascii on GitHub">
          Star
        </GitHubButton>
      </footer>
    </div>
  );
}

export default App;
