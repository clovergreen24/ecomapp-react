import { useContext } from "react";
import { Stock } from "../interfaces/Stock";
import { CartContext } from "./CartContext";
import { Product } from "../interfaces/Product";

interface MinusPlusButtonsProps{
    stock: Stock;
    product: Product;
    availableStock: number;
}

const MinusPlusButtons: React.FC<MinusPlusButtonsProps> = ({stock, product, availableStock}) => {
    const useCartContext = () => {
		const cartContext = useContext(CartContext);
		if (cartContext === undefined) {
			throw new Error("useCartContext must be used within a CartProvider");
		}
		return cartContext;
	};
    
	const { addToCart, removeFromCart, amountInCart } = useCartContext();

    return (
        <>
        {stock.amount > 0 ? (
            <div className="flex items-center mx-2">
                <button
                    className="bg-pink-300 p-2"
                    onClick={() => removeFromCart(stock.id)}
                >
                    <img
                            src="/minus.svg"
                            className="w-6 h-6"
                        />
                </button>
                <span className="text-pink-800 px-2 ">
                    {amountInCart(stock.id)}
                </span>
                {amountInCart(stock.id) < availableStock ? (
                    <button
                        className="bg-pink-300 p-2"
                        onClick={() => addToCart(stock, product)}
                    >
                        <img
                            src="/plus.svg"
                            className="w-6 h-6 text-pink-600"
                        />
                    </button>
                ) : (
                    <button className="bg-pink-300 p-2" disabled>
                        <img
                            src="/plus.svg"
                            className="w-6 h-6"
                        />
                    </button>
                )}
            </div>
        ) : (
            <p className="text-pink-800 text-center">Out of stock</p>
        )}
        </>
    )
}

export default MinusPlusButtons;