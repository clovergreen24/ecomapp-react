import { Order } from "../interfaces/Order";
import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";
import { Stock } from "../interfaces/Stock";



function CheckoutPage() {
	const [address, setAddress] = useState<string>("");
	const [mail, setMail] = useState<string>("");
	const useCartContext = () => {
		const cartContext = useContext(CartContext);
		if (cartContext === undefined) {
			throw new Error("useCartContext must be used within a CartProvider");
		}
		return cartContext;
	};
	const findStocks = (id: number) => {
		const stocks = cart.filter((stock) => stock.product_id === id);
		return stocks as Stock[];
	};
	const { cart, cartProducts, total } = useCartContext();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars

	const handleInputAddressChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setAddress(event.target.value);
	};

	const handleInputMailChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setMail(event.target.value);
	};

	const placeOrder = (event: React.FormEvent<HTMLFormElement>) => {

		event.preventDefault();

		const order: Order = {
			total: total(),
			fulfilled: false,
			cartStocks: cart,
			cartProducts: cartProducts,
			address: address,
			customer_email: mail,
		};

		axios
			.post("http://localhost:3000/api/v1/orders", order, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				console.log("Order placed successfully:", response.data);
                window.location.replace('/orderplaced');
			})
			.catch((error) => {
				console.error("Error placing order:", error);
			});
	};

	return (
		<div>
			<h1>Checkout Page</h1>
			<form onSubmit={placeOrder}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					className="text-pink-800 "
					value={mail}
					onChange={handleInputMailChange}
					required
				/>
				<label htmlFor="address">Address</label>
				<input
					type="text"
					id="address"
					name="address"
					className="text-pink-800 "
					value={address}
					onChange={handleInputAddressChange}
					required
				/>
				<button type="submit">Place Order</button>
			</form>

			<div className="bg-white rounded p-4 items-left">
				{cartProducts.map((product) => {
					const stocks = findStocks(product.id);
					return (
						<div key={product.id} className="grid grid-cols-3 items-center">
							<img
								src={product.image_url}
								alt={product.name}
								className="w-40 h-40 mr-4 rounded col-span-1 "
							/>
							<div className="col-span-2">
								<p className="text-pink-800 text-2xl font-bold">
									{product.name}
								</p>
								<p className="text-pink-800 text-xl">
									Individual price ${product.price}
								</p>

								{stocks.map((stock) => (
									<div key={stock.id} className="">
										<p className="text-pink-800 text-xl">Size: {stock.size}</p>
										<p className="text-pink-800 text-xl">
											Amount: {stock.amount}
										</p>
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default CheckoutPage;
