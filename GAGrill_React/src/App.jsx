import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import AboutUs from './Components/AboutUs';
import MainContent from './Components/MainContent';
import Footer from './Components/Footer';
import MenuContent from './Components/MenuContent';
import SearchBar from './Components/SearchBar';
import FilteredMenu from './Components/FilteredMenu';
import Cart from './Components/Cart';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CustomerDashboard from './Components/CustomerDashboard';
import AdminDashboard from './Components/AdminDashboard';

function ScrollToMenuSection({ searchQuery }) {
  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.replace("/", "");
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 200); // slight delay to ensure DOM is ready
      }
    }
  }, [location]);

  return searchQuery ? (
    <FilteredMenu query={searchQuery} />
  ) : (
    <MenuContent />
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    
      <div className="app-container">
        <Header />
        <SearchBar setQuery={setSearchQuery} />

        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/menu" element={
            searchQuery ? (
              <FilteredMenu query={searchQuery} />
            ) : (
              <MenuContent />
            )
          } />
          <Route path="/soup-salads" element={<ScrollToMenuSection searchQuery={searchQuery} />} />
          <Route path="/tandoori-starters" element={<ScrollToMenuSection searchQuery={searchQuery} />} />
          <Route path="/tandoori-mains" element={<ScrollToMenuSection searchQuery={searchQuery} />} />
          <Route path="/beverages" element={<ScrollToMenuSection searchQuery={searchQuery} />} />
          <Route path="/sides" element={<ScrollToMenuSection searchQuery={searchQuery} />} />
          <Route path="/ice-creams" element={<ScrollToMenuSection searchQuery={searchQuery} />} />
          <Route path="/cart" element={<Cart />} />
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
