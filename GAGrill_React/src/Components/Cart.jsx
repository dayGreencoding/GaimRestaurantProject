import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const cartItems = Object.values(cart);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>

          <button onClick={() => navigate('/checkout')}>Go to Checkout</button>
          <button onClick={clearCart} style={{ marginLeft: '1rem' }}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
