// src/Components/CartDrawer.jsx
import React from 'react';
import './CartDrawer.css';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ onClose }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const cartItems = Object.values(cart);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-item-list">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <strong>{item.name}</strong> x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-button" onClick={() => navigate('/checkout')}>
              Checkout
            </button>
            <button className="clear-button" onClick={clearCart}>
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
