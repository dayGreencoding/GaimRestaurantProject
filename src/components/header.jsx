import React from 'react';
import {Link} from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">GAI Grill</div>
      <nav className="nav-links">
        <Link to="/Home">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="header-actions">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
        </Link>
        <Link to="/login" className="login-button">Login/Register</Link>
      </div>
    </header>
  );
};

export default Header;