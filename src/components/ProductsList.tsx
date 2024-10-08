import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../interfaces/Product";
import { Link, useParams } from "react-router-dom";
import { Category } from "../interfaces/Category";
import { ENDPOINTS } from "../config";

const ProductsList = () => {
	const [products, setProducts] = useState<[Product[]]>([[]]);
	const [category, setCategory] = useState<Category>();
	const { category_id } = useParams();

	useEffect(() => {
		axios
			.get(
				ENDPOINTS.PRODUCTS_BY_CATEGORY(category_id ? category_id.toString() : "")
			)
			.then((response) => setProducts(response.data))
			.catch((error) => console.error("Error fetching data:", error));
	}, [category_id]);

	useEffect(() => {
		axios
			.get(
				ENDPOINTS.CATEGORY(category_id ? category_id.toString() : "")
			)
			.then((response) => setCategory(response.data))
			.catch((error) => console.error("Error fetching data:", error));
	}, [category_id]);

	return (
		<div className="my-5 mx-20 py-4 px-10 bg-pink-200 rounded">
			<h1 className="text-pink-800 font-bold text-4xl my-5">
				{category?.name}
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((productsList, index) =>
					index === 0
						? productsList.map((product) => (
								<Link to={`/${category_id}/products/${product.id}`}>
									<div
										key={product.id}
										className="bg-white shadow-md rounded-lg p-4"
									>
										<img
											src={product.image_url}
											alt={product.name}
											className="w-full h-48 object-cover mb-4 rounded-lg"
										/>
										<h2 className="text-xl font-bold mb-2 text-pink-800">
											{product.name}
										</h2>
										<p className="text-pink-700 mb-4">${product.price}</p>
										<button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
											View Product
										</button>
									</div>
								</Link>
						))
						: productsList.map((product) => (
								<div
									key={product.id}
									className="bg-gray-500 shadow-md rounded-lg p-4"
								>
									<img
										src={product.image_url}
										alt={product.name}
										className="w-full h-48 object-cover mb-4 rounded-lg"
									/>
									<h2 className="text-xl font-bold mb-2 text-black">
										{product.name}
									</h2>
									<p className="text-black mb-4">${product.price}</p>
									<p className="bg-gray-300 text-black font-bold py-2 px-4 rounded inline-block">
										Out of stock
									</p>
								</div>
						))
				)}
			</div>
		</div>
	);
};

export default ProductsList;
