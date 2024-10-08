import { useState } from 'react';
import Checkout from '../components/Checkout';
import Payment from '../components/Payment';
import OrderPlaced from '../components/OrderPlaced';
import { Order } from '../interfaces/Order';

function CheckoutPage() {
	const [step, setStep] = useState<number>(1);

	//function for the variables to make the order
	const [address, setAddress] = useState<string>("");
	const [mail, setMail] = useState<string>("");
	const [order, setOrder] = useState<Order>();
	//funtion that creates the order
	const [error, setError] = useState<string>("");
	//function that posts the order

	return (
		<div>
			
			{error && (<p className="bg-red-500 rounded p-2 inline-block">We're so sorry! {error}</p>)}
			{step === 1 && <Checkout setStep={setStep} setAddress={setAddress} address={address} setMail={setMail} mail={mail} setOrder={setOrder} order={order}/>}
			{step === 2 && <Payment order={order} setError={setError} setStep={setStep} />}
			{step === 3 && <OrderPlaced/>}
		</div>
	);
}
export default CheckoutPage;
