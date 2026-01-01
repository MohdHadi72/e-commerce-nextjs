"use client";

import { createContext, useContext, useState } from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartContextType = {
  cartlist: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartlist, setCart] = useState<CartItem[]>([]);
 
  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cartlist, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
