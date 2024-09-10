import { useContext, useEffect, useState } from "react";
import { Stock } from "../interfaces/Stock";
import { CartContext } from "../components/CartContext";
import { Link } from "react-router-dom";
import MinusPlusButtons from "../components/MinusPlusButtons";
import axios from "axios";

function CartPage() {
	const useCartContext = () => {
		const cartContext = useContext(CartContext);
		if (cartContext === undefined) {
			throw new Error("useCartContext must be used within a CartProvider");
		}
		return cartContext;
	};
	const { cart, cartProducts, emptyCart, total} = useCartContext();
	const [stocks, setStocks] = useState<Stock[]>(cart);

	const findStocks = (id: number) => {
		const stocks = cart.filter((stock) => stock.product_id === id);
		return stocks as Stock[];
	};

	useEffect(() => {
		
		const fetchStocks = async () => {
			try{
				const stocklist = cart.map(stock => stock.id).join(',');
				axios
			.get("http://localhost:3000/api/v1/stocks/available_stock/"+ stocklist)
			.then((response) => {
				setStocks(response.data);
			})
			} catch(error){
				console.error("Error fetching data:", error);
			}
		}
		fetchStocks();
	},[cart]);

	const findAvailableStock = (id: number): Stock => {
		return stocks.find((stock) => stock.id === id) || ({} as Stock);
	}


	return(
		<div className="bg-pink-200 mx-20 p-10 pt-5 rounded">
			<h1 className="text-pink-800 font-bold mb-5">Cart</h1>

			{cart.length === 0 ? (
				<h3 className="text-pink-800 text-2xl">Your cart is empty</h3>
			) : (
				<div className="bg-white rounded p-4">
					{cartProducts.map((product) => {
						const stocks = findStocks(product.id);
						return (
							<div key={product.id} className="flex ml-10 mt-5">
								<img src={product.image_url} alt={product.name} className="w-40 h-40 rounded"/>
								<div className="ml-10">
									<p className="text-pink-800 text-2xl font-bold">{product.name}</p>
									<p className="text-pink-800 text-xl">Individual price ${product.price}</p>
								
								{stocks.map((stock => (
                                    <div key={stock.id} className="">
                                        <p className="text-pink-800 text-xl">Size: {stock.size}</p>
                                        <p className="text-pink-800 text-xl">Amount: {stock.amount}</p>
											<MinusPlusButtons stock={stock} product={product} availableStock={findAvailableStock(stock.id).amount} />
                                    </div>
                                )
                                ))}
								</div>
							</div>
						);
					})}
					<h5 className="text-pink-800 text-4xl mx-10 text-right">Total: ${total()}</h5>
					<div className="flex justify-between mx-10">
					<button className="bg-pink-400 text-pink-600 font-bold rounded p-4 mt-6" onClick={emptyCart}>Empty cart</button>
						<Link to="/checkout">
						<button className="bg-pink-600 text-white font-bold rounded p-4 mt-6">Place order</button>
						</Link>
					</div>
					
					
				</div>
			)}
		</div>
	)
}

export default CartPage;
