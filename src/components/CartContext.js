import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [favourites, setFavourites] = useState([]);

  const addToCart = (product) => {
    setCart(currentCart => {
      const itemIndex = currentCart.findIndex(item => item.id === product.id);
      if (itemIndex > -1) {
        const newCart = [...currentCart];
        newCart[itemIndex].quantity += 1;
        return newCart;
      } else {
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

  const addToFavourites = (product) => {
    setFavourites(currentFavourites => {
      const itemIndex = currentFavourites.findIndex(item => item.id === product.id);
      if (itemIndex > -1) {
        const newFavourites = [...currentFavourites];
        newFavourites[itemIndex].quantity += 1;
        return newFavourites;
      } else {
        return [...currentFavourites, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromFavourites = (productId) => {
    setFavourites(currentFavourites => currentFavourites.filter(item => item.id !== productId));
  };

  const increaseFavouriteQuantity = (productId) => {
    setFavourites(currentFavourites => currentFavourites.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseFavouriteQuantity = (productId) => {
    setFavourites(currentFavourites => currentFavourites.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity - 1;
        return { ...item, quantity: newQuantity >= 1 ? newQuantity : 1 };
      }
      return item;
    }));
  };


  return (
    <CartContext.Provider value={{ cart, favourites, addToCart, addToFavourites, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, removeFromFavourites, increaseFavouriteQuantity, decreaseFavouriteQuantity }}>
      {children}
    </CartContext.Provider>
  );

};
