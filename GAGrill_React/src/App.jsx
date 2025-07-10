import React, { useState } from 'react';
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

function ScrollToSection() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const id = pathname.replace("/", "");
    if (id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  return <MenuContent />;
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
        <Route
          path="/menu"
          element={
            searchQuery ? (
              <FilteredMenu query={searchQuery} />
            ) : (
              <MenuContent />
            )
          }
        />
        <Route path="/soup-salads" element={<ScrollToSection />} />
        <Route path="/tandoori-starters" element={<ScrollToSection />} />
        <Route path="/tandoori-mains" element={<ScrollToSection />} />
        <Route path="/beverages" element={<ScrollToSection />} />
        <Route path="/sides" element={<ScrollToSection />} />
        <Route path="/ice-creams" element={<ScrollToSection />} />
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
