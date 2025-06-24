import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header'; 
function App() {
  return (
    <Router>
      <div className="app-container">
        <Header /> {/* This contains header, main, and footer */}
      </div>
    </Router>
  );
}

export default App;
