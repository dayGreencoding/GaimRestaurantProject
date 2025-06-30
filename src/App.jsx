import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import AboutUs from './Components/AboutUs';
import MainContent from './Components/MainContent';
import Footer from './Components/Footer';
import SearchBar from './Components/SearchBar';

function App() {
  return (
    
      <div className="app-container">
        <Header />
         <SearchBar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    
  );
}

export default App;
