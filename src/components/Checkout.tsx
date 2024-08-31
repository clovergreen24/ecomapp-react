import { Order } from "../interfaces/Order";
import { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { Stock } from "../interfaces/Stock";

interface CheckoutProps {
	setStep: (step: number) => void;
	setAddress: (address: string) => void;
	address: string;
	setMail: (mail: string) => void;
	mail: string;
	setOrder: (order: Order) => void;
	order: Order | undefined;
}

const Checkout: React.FC<CheckoutProps> = ({ setStep, setAddress, address, setMail, mail, setOrder, order }) => {
    

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

	const placeOrder = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		order = {
			total: total(),
			fulfilled: false,
			cartStocks: cart,
			cartProducts: cartProducts,
			address: address,
			customer_email: mail,
		};
		setOrder(order);
		setStep(2);
		
	};

    return (
        <div className="bg-pink-200 items-left mx-20 p-10 rounded">
			<h1 className="text-pink-800 font-bold mb-10">Checkout</h1>
			<div>
				
				<div className="bg-white rounded p-4 items-left m-4">
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
										Individual price: ${product.price}
									</p>

									{stocks.map((stock) => (
										<div key={stock.id} className="">
											<p className="text-pink-800 text-xl">
												Size: {stock.size}
											</p>
											<p className="text-pink-800 text-xl">
												Amount: {stock.amount}
											</p>
										</div>
									))}
								</div>
							</div>
						);
					})}
					<h5 className="text-pink-800 text-4xl m-5 text-right">
						Total: ${total()}
					</h5>
				</div>
			</div>
			<form onSubmit={placeOrder} className="">
				<label htmlFor="email" className="m-2 text-pink-800 text-xl font-bold">
					Email:
				</label>
				<input
					type="email"
					id="email"
					name="email"
					className="text-pink-800 "
					value={mail}
					onChange={(e) => setMail(e.target.value)}
					required
				/>
				<label
					htmlFor="address"
					className="m-2 text-pink-800 text-xl font-bold"
				>
					Address:
				</label>
				<input
					type="text"
					id="address"
					name="address"
					className="text-pink-800 "
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					required
				/>
				<button type="submit" className="bg-pink-500 m-2 font-bold">
					Place Order
				</button>
			</form>
		</div>
    )
}

export default Checkout;