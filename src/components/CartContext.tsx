// CartContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {  CartContextType } from '../interfaces/CartContextType';
import { Stock } from '../interfaces/Stock';
import { Product } from '../interfaces/Product';

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Stock[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartProducts, setCartProducts] = useState<Product[]>(() => {
    const savedCartProducts = localStorage.getItem('cart');
    return savedCartProducts ? JSON.parse(savedCartProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cart, cartProducts]);

  const addToCart = (item: Stock, itemProduct: Product) => {

    setCart(prevCart => {
      const found = prevCart.find(itemc => itemc.id === item.id);
      const foundProduct = cartProducts.find(itemProduct => itemProduct.id === item.product_id);

      if (found) { //if the stock is already in the cart it adds one to the amount of it
        return prevCart.map(itemc => {
          if (itemc.id === item.id) {
            return { ...itemc, amount: itemc.amount + 1 };
          } else {
            return itemc;
          }
        });
      }
      if (!foundProduct){ //if not first I have to check if its product is already in the cart
          setCartProducts([...cartProducts, itemProduct]);
      }
        return [...prevCart, { ...item, amount: 1 }]; //finally I return the new stock with amount 1
      }
    
    )
  };

  const removeFromCart = (itemId: number) => {
    
    setCart(prevCart => prevCart.map(item => {
      if (item.id === itemId) { //I look for the stock I want to reduce by 1
      if (item.amount > 1) {
        return { ...item, amount: item.amount - 1 }; //if it doesn't end up as zero, I reduce it
      } else {
        const remove = cart.filter(itemc => itemc.product_id === item.product_id).length == 1;
        if (remove) { //if it gets to zero I have to check for other stocks for the same product in the cart
          setCartProducts(cartProducts.filter(itemProduct => itemProduct.id !== item.product_id)); //if there arent any more stocks for it, I remove the product
        }
        return null; //and I always remove the stock that gets to zero
      }
      } else {
      return item; //if it doesnt match the id I leave it as is
      }
    }).filter(item => item !== null));
  };

  const emptyCart = () => {
    setCart([]);
    setCartProducts([]);
  }

  const total = () => {
    const values = cart.map(stock => {
      const product = cartProducts.find(itemProduct => itemProduct.id === stock.product_id);
      return stock.amount * product!.price;
    })

    return values.reduce((acc, value) => acc + value, 0);
  }

  const amountInCart = (id: number) => {
    return cart.find(stock => stock.id === id)?.amount || 0;
  }

  return (
    <CartContext.Provider value={{ cart, cartProducts, addToCart, removeFromCart,emptyCart, total, amountInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
