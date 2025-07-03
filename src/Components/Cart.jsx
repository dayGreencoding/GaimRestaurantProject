import React from 'react';

const Cart = () => {
  // Placeholder cart data
  const cartItems = [
    { id: 1, name: 'Paneer Tikka', price: 11.99 },
    { id: 2, name: 'Sweet Corn Soup', price: 7.49 },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
