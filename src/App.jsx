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
<<<<<<< HEAD
import SearchBar from './Components/SearchBar';
=======
>>>>>>> 16d76beaa456a2682a57402fc1f5fba9f4879672
=======
import Login from './Components/Login';
import Signup from './Components/Signup';
import CustomerDashboard from './Components/CustomerDashboard';
import AdminDashboard from './Components/AdminDashboard';
>>>>>>> cea9ee2 (Deleted login dropdown of vedha)

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
          <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    
  );
}

export default App;
