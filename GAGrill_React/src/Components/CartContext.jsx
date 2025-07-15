import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const clearCart = () => setCart({}); // ✅ Clears all items

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[id]; // ✅ Removes one item
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, clearCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
