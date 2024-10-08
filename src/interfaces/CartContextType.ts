import { Product } from "./Product";
import { Stock } from "./Stock";

export interface CartContextType {
    cart: Stock[];
    cartProducts: Product[];
    addToCart: (item: Stock, itemProduct: Product) => void;
    removeFromCart: (itemId: number) => void;
    emptyCart: () => void;  
    total: () => number;
    amountInCart: (id: number) => number;
  }