import { useContext } from "react";
import { Stock } from "../interfaces/Stock";
import { CartContext } from "../components/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
	const useCartContext = () => {
		const cartContext = useContext(CartContext);
		if (cartContext === undefined) {
			throw new Error("useCartContext must be used within a CartProvider");
		}
		return cartContext;
	};
	const { cart, cartProducts, emptyCart, total, addToCart,removeFromCart, amountInCart } = useCartContext();

	const findStocks = (id: number) => {
		const stocks = cart.filter((stock) => stock.product_id === id);
		return stocks as Stock[];
	};
	
	return(
		<div className="bg-pink-200 items-left mx-20 p-10 rounded">
			<h1 className="text-pink-800 font-bold mb-10">Cart</h1>

			{cart.length === 0 ? (
				<h3 className="text-pink-800 text-2xl">Your cart is empty</h3>
			) : (
				<div className="bg-white rounded p-4 items-left">
					{cartProducts.map((product) => {
						const stocks = findStocks(product.id);
						return (
							<div key={product.id} className="grid grid-cols-3 items-center">
								<img src={product.image_url} alt={product.name} className="w-40 h-40 mr-4 rounded col-span-1 "/>
								<div className="col-span-2">
									<p className="text-pink-800 text-2xl font-bold">{product.name}</p>
									<p className="text-pink-800 text-xl">Individual price ${product.price}</p>
								
								{stocks.map((stock => (
                                    <div key={stock.id} className="">
                                        <p className="text-pink-800 text-xl">Size: {stock.size}</p>
                                        <p className="text-pink-800 text-xl">Amount: {stock.amount}</p>
											<button className="" onClick={() => removeFromCart(stock.id)}>-</button>
											<span className="text-pink-800 px-2">{amountInCart(stock.id)}</span>
											<button className="" onClick={() => addToCart(stock,product)}>+</button>
                                    </div>
                                )
                                ))}
								</div>
							</div>
						);
					})}
					<h5 className="text-pink-800 text-4xl m-5 text-right">Total: ${total()}</h5>
					<div>
						<Link to="/checkout">
						<button className="bg-pink-600 text-white font-bold rounded p-2 align-right my-5">Place order</button>
						</Link>
					</div>
					
					<button className="bg-pink-600 text-white font-bold rounded p-2" onClick={emptyCart}>Empty cart</button>
				</div>
			)}
		</div>
	)
}

export default CartPage;
