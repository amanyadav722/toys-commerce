import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(currentCart => {
      // Check if the item is already in the cart
      const itemIndex = currentCart.findIndex(item => item.id === product.id);
      if (itemIndex > -1) {
        // Update the quantity
        const newCart = [...currentCart];
        newCart[itemIndex].quantity += 1;
        return newCart;
      } else {
        // Add the new item with a quantity of 1
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart(currentCart => currentCart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (productId) => {
    setCart(currentCart => currentCart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity - 1 < 1 ? 1 : item.quantity - 1 };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );

};
