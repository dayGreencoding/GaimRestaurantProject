import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Pictorial from './Pictorial';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="app-container">
        <Header />

        <div>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1>Gain Grill</h1>

        {/* Custom pictorial section */}
        <Pictorial />

        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>

        <MainContent />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
