import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import logoImage from '../assets/logotop.jpg';
import './Header.css';
import LoginDropdown from './LoginDropdown';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="GAI Grill Logo" className="logo-image" />
        <span className="logo-text">GAI Grill</span>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="header-right">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
        </Link>
        <LoginDropdown />
      </div>
    </header>
  );
};

export default Header;
