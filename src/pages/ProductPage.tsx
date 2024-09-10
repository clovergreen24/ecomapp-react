import { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Stock } from "../interfaces/Stock";
import BackButton from "../components/BackButton";
import MinusPlusButtons from "../components/MinusPlusButtons";
import { ENDPOINTS } from "../config";

function ProductPage() {
	const [product, setProduct] = useState<Product>({} as Product);
	const [stocks, setStocks] = useState<Stock[]>([]);

	const { product_id } = useParams();
	
	useEffect(() => {
		axios
			.get(
				ENDPOINTS.PRODUCT(product_id ? product_id.toString() : "")
			)
			.then((response) => {
				setProduct(response.data);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, [product_id]);

	useEffect(() => {
		axios
			.get(
				ENDPOINTS.PRODUCT_STOCKS(product_id ? product_id.toString() : "")
			)
			.then((response) => {
				setStocks(response.data);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, [product_id]);

	return (
        <>
        <BackButton text="Products"/>
		<div className="mx-40 my-5 p-6 flex bg-pink-100 rounded">
            
			<div>
				<img
					src={product.image_url}
					alt={product.name}
					className="w-80 h-80 mr-10 rounded"
				/>
			</div>
			<div className="">
				<h1 className="font-semibold text-pink-600 my-5">{product.name}</h1>
				<p className="my-5 text-xl text-pink-700">{product.description}</p>
				<p className="text-3xl text-pink-800">${product.price}</p>

				<table className=" my-4 border-pink-600 text-lg">
					<thead>
						<tr className="font-bold text-pink-600 ">
							<th className="px-3 border-2 border-pink-600">Size</th>
							<th className="px-3 border-2 border-pink-600">Stock</th>
						</tr>
					</thead>
					<tbody>
						{stocks.map((stock) => (
							<>
								<tr key={stock.id}>
									<td className="border-2 border-pink-600">
										<p className="text-pink-800 text-center">{stock.size}</p>
									</td>
									<td className="border-2 border-pink-600">
										<p className="text-pink-800 text-center">{stock.amount}</p>
									</td>

									<td className="">
                                        <MinusPlusButtons stock={stock} product={product} availableStock={stock.amount}/>
									</td>
								</tr>
							</>
						))}
					</tbody>
				</table>
			</div>
		</div>
        </>
	);
}

export default ProductPage;
