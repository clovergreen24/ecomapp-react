import { useContext, useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../components/CartContext";
import { Stock } from "../interfaces/Stock";

function ProductPage () {
    const [product, setProduct] = useState<Product>({} as Product);
    const [stocks, setStocks] = useState<Stock[]>([]);

    const{product_id} = useParams();
    const cartContext = useContext(CartContext);
    
    const { addToCart } = cartContext!;

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/products/'+ (product_id ? product_id.toString() : ''))
        .then(response => {console.log(response.data),setProduct(response.data)})
        .catch(error => console.error('Error fetching data:', error));
    },[]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/stocks/'+ (product_id ? product_id.toString() : ''))
        .then(response => setStocks(response.data))
        .catch(error => console.error('Error fetching data:', error));
    },[]);

    return(
        <div className="mx-40 my-10 p-6 flex items-center bg-white rounded">
            <div>
            <img src={product.image_url} alt={product.name} className="w-80 h-80"/>
            </div>
            <div className="w-80 h-80">
                <h1 className="font-semibold text-pink-600 my-10">{product.name}</h1>
                <p className="my-5 text-xl text-pink-700">{product.description}</p>
                <p className="text-bold text-3xl text-pink-800">${product.price}</p>
                <p>
                    {stocks.map(stock => (
                        <>
                            <p>{stock.size}</p>
                            <p>{stock.amount}</p>
                        </>
                    ))}
                </p>
                <button className="my-5" onClick={() => addToCart(product)} >Add to Cart</button>
                </div>
                
        </div>
    )
}

export default ProductPage;