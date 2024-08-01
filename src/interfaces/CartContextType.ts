import { Product } from "./Product";

export interface CartContextType {
    cart: Product[];
    addToCart: (item: Product) => void;
    removeFromCart: (itemId: number) => void;
  }