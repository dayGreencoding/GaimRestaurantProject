import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import AboutUs from './Components/AboutUs';
import MainContent from './Components/MainContent';
import Footer from './Components/Footer';

import Login from './Components/Login';
import Signup from './Components/signup';
import CustomerDashboard from './Components/CustomerDashboard';
import AdminDashboard from './Components/AdminDashboard';

function App() {
  return (
    <div className="app-container">
      <Header />
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
