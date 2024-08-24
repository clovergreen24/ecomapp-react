import { Product } from "./Product";
import { Stock } from "./Stock";

export interface Order {
    customer_email: string;
    cartStocks: Stock[];
    cartProducts: Product[];
    total: number;
    address: string;
    fulfilled: boolean;
}