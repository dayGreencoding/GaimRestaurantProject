// src/Components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import logoImage from '../assets/logotop.jpg';
import './Header.css';

const Header = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="GAI Grill Logo" className="logo-image" />
        </Link>
        <span className="logo-text">GAI Grill</span>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>

        <div className="menu-dropdown">
          <Link to="/menu" className="dropbtn">Menu ▼</Link>
            <div className="dropdown-content">
              <Link to="/soup-salads">Soup & Salads</Link>
              <Link to="/tandoori-starters">Tandoori Starters</Link>
              <Link to="/tandoori-mains">Tandoori Mains & Sizzlers</Link>
              <Link to="/beverages">Beverages</Link>
              <Link to="/sides">Sides</Link>
                 <Link to="/ice-creams">Ice Creams</Link>
            </div>
        </div>


              <Link to="/about-us">About Us</Link>
              <Link to="/contact">Contact</Link>
      </nav>

      <div className="header-right">
        <Link to="/Cart" className="cart-icon">
          🛒 Cart
          <FaShoppingCart />
        </Link>

        {!userRole ? (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="login-btn">Register</Link>
          </>
        ) : (
          <>
            {userRole === 'admin' && (
              <Link to="/admin-dashboard" className="dashboard-link">Admin Dashboard</Link>
            )}
            {userRole === 'customer' && (
              <Link to="/customer-dashboard" className="dashboard-link">Customer Dashboard</Link>
            )}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

