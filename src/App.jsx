import React from 'react';
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> 16d76beaa456a2682a57402fc1f5fba9f4879672
import Header from './Components/Header';
import AboutUs from './Components/AboutUs';
import MainContent from './Components/MainContent';
import Footer from './Components/Footer';
<<<<<<< HEAD
import SearchBar from './Components/SearchBar';
=======
>>>>>>> 16d76beaa456a2682a57402fc1f5fba9f4879672

function App() {
  return (
    
      <div className="app-container">
        <Header />
<<<<<<< HEAD
         <SearchBar />
=======
>>>>>>> 16d76beaa456a2682a57402fc1f5fba9f4879672
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    
  );
}

export default App;
