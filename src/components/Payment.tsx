import axios from "axios";
import { Order } from "../interfaces/Order";
import { useContext } from "react";
import { CartContext } from "../components/CartContext";

interface PaymentProps {
	order: Order | undefined;
	setError: (error: string) => void;
    setStep: (step: number) => void;
}

const Payment: React.FC<PaymentProps> = ({ order, setError, setStep }) => {
	const useCartContext = () => {
		const cartContext = useContext(CartContext);
		if (cartContext === undefined) {
			throw new Error("useCartContext must be used within a CartProvider");
		}
		return cartContext;
	};
	const { emptyCart, total } = useCartContext();

	const placeOrder = () => {
		axios
			.post("http://localhost:3000/api/v1/orders", order, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				console.log("Order placed successfully:", response.data);
				emptyCart();
			})
			.catch((error) => {
				console.error("Error placing order:", error);
				setError(error.response.data.error);
			});
        setStep(3);
	};

	return (
		<section className="bg-white py-8 antialiased dark:bg-pink-900 md:py-16">
			<div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
				<div className="mx-auto max-w-5xl">
					<h2 className="text-xl font-semibold text-pink-900 dark:text-white sm:text-2xl">
						Payment
					</h2>

					<div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
						<form
							onSubmit={placeOrder}
							className="w-full rounded-lg border border-pink-200 bg-white p-4 shadow-sm dark:border-pink-700 dark:bg-pink-800 sm:p-6 lg:max-w-xl lg:p-8"
						>
							<div className="mb-6 grid grid-cols-2 gap-4">
								<div className="col-span-2 sm:col-span-1">
									<label
										htmlFor="full_name"
										className="mb-2 block text-sm font-medium text-pink-900 dark:text-white"
									>
										Full name (as displayed on card)
									</label>
									<input
										type="text"
										id="full_name"
										className="block w-full rounded-lg border border-pink-300 bg-pink-50 p-2.5 text-sm text-pink-900 focus:border-primary-500 focus:ring-primary-500 dark:border-pink-600 dark:bg-pink-700 dark:text-white dark:placeholder:text-pink-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										placeholder="Bonnie Green"
										required
									/>
								</div>

								<div className="col-span-2 sm:col-span-1">
									<label
										htmlFor="card-number-input"
										className="mb-2 block text-sm font-medium text-pink-900 dark:text-white"
									>
										Card number
									</label>
									<input
										type="text"
										id="card-number-input"
										className="block w-full rounded-lg border border-pink-300 bg-pink-50 p-2.5 pe-10 text-sm text-pink-900 focus:border-primary-500 focus:ring-primary-500 dark:border-pink-600 dark:bg-pink-700 dark:text-white dark:placeholder:text-pink-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										placeholder="xxxx-xxxx-xxxx-xxxx"
										pattern="^[0-9]{16}$"
										required
									/>
								</div>

								<div>
									<label
										htmlFor="card-expiration-input"
										className="mb-2 block text-sm font-medium text-pink-900 dark:text-white"
									>
										Card expiration
									</label>
									<div className="relative">
										<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
											<svg
												className="h-4 w-4 text-pink-500 dark:text-pink-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													fillRule="evenodd"
													d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<input
											type="text"
											id="card-expiration-input"
											className="block w-full rounded-lg border border-pink-300 bg-pink-50 p-2.5 ps-9 text-sm text-pink-900 focus:border-blue-500 focus:ring-blue-500 dark:border-pink-600 dark:bg-pink-700 dark:text-white dark:placeholder:text-pink-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
											placeholder="12/23"
                                            pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
											required
										/>
									</div>
								</div>
								<div className="relative inline-block">
									<label className="mb-2 block text-sm font-medium text-pink-900 inline-block dark:text-white">
										CCV
										<button
											className="p-1 rounded-full text-pink-400 hover:text-pink-700 dark:text-gray-500 inline-block group dark:hover:text-white"
											aria-label="Info"
										>
											<svg
												className="h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M13 16h-1v-4h-1m1-4h.01M12 20.5a8.5 8.5 0 110-17 8.5 8.5 0 010 17z"
												/>
											</svg>
											<div className="absolute left-1/2 transform -translate-x-1/2 mt-2 hidden w-32 rounded-lg bg-gray-900 p-2 text-sm text-white shadow-lg group-hover:block dark:bg-gray-700">
												The three digits on the back of your card
											</div>
										</button>
									</label>

									<input
										type="text"
										id="ccv-input"
										className="block w-full rounded-lg border border-pink-300 bg-pink-50 p-2.5 pe-10 text-sm text-pink-900 focus:border-primary-500 focus:ring-primary-500 dark:border-pink-600 dark:bg-pink-700 dark:text-white dark:placeholder:text-pink-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										placeholder="..."
										required
									/>
								</div>
							</div>

							<button
								type="submit"
								className="flex w-full items-center justify-center rounded-lg bg-pink-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Pay now
							</button>
						</form>

						<div className="mt-6 grow sm:mt-8 lg:mt-0">
							<div className="space-y-4 rounded-lg border border-pink-100 bg-pink-50 p-4 dark:border-pink-700 dark:bg-pink-800 sm:p-6">
								<div className="flex justify-between">
									<p className="text-pink-500 dark:text-pink-400">Subtotal</p>
									<p className="text-pink-600 dark:text-pink-200">${total()}</p>
								</div>
								<div className="flex justify-between">
									<p className="text-pink-500 dark:text-pink-400">Shipping</p>
									<p className="text-pink-600 dark:text-pink-200">$14.89</p>
								</div>
								<div className="flex justify-between">
									<p className="text-lg font-semibold text-pink-900 dark:text-white">
										Total
									</p>
									<p className="text-lg font-semibold text-pink-900 dark:text-white">
										${14.89 + total()}
									</p>
								</div>
								<div className="flex justify-between">
									<p className="text-pink-500 dark:text-pink-400">VAT</p>
									<p className="text-pink-600 dark:text-pink-200">$20.88</p>
								</div>
							</div>
							<div className="mt-6 flex items-center justify-center gap-8">
								<img
									className="h-8 w-auto dark:hidden"
									src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
									alt=""
								/>
								<img
									className="hidden h-8 w-auto dark:flex"
									src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
									alt=""
								/>
								<img
									className="h-8 w-auto dark:hidden"
									src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
									alt=""
								/>
								<img
									className="hidden h-8 w-auto dark:flex"
									src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
									alt=""
								/>
								<img
									className="h-8 w-auto dark:hidden"
									src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
									alt=""
								/>
								<img
									className="hidden h-8 w-auto dark:flex"
									src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Payment;
