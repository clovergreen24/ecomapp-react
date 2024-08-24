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

    const useCartContext = () => {

        const cartContext = useContext(CartContext);
        if (cartContext === undefined) {
            throw new Error('useCartContext must be used within a CartProvider');
        }
        return cartContext;
    }
    
    const { addToCart, removeFromCart, amountInCart } = useCartContext();

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/products/'+ (product_id ? product_id.toString() : ''))
        .then(response => {setProduct(response.data)})
        .catch(error => console.error('Error fetching data:', error));
    },[]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/stocks/'+ (product_id ? product_id.toString() : ''))
        .then(response => {setStocks(response.data)})
        .catch(error => console.error('Error fetching data:', error));
    },[]);

    return(
        <div className="mx-40 my-10 p-6 flex bg-white rounded">
            <div>
            <img src={product.image_url} alt={product.name} className="w-80 h-80 mr-10 rounded"/>
            </div>
            <div className="">
                <h1 className="font-semibold text-pink-600 my-5">{product.name}</h1>
                <p className="my-5 text-xl text-pink-700">{product.description}</p>
                <p className="text-3xl text-pink-800">${product.price}</p>
                
                <table className="border-2 my-4">
                    <thead>
                        <tr className="font-bold text-pink-600 ">
                            <th className="px-3 border-2">Size</th>
                            <th className="px-3 border-2">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stocks.map(stock => (
                        <>
                        <tr key={stock.id}>
                            <td className="border-2">
                                <p className="text-pink-800 text-center">{stock.size}</p>
                            </td>
                            <td className="border-2">
                                <p className="text-pink-800 text-center">{stock.amount}</p>
                            </td>
                            <td>
                            <button className="" onClick={() => removeFromCart(stock.id)}>-</button>
                            <span className="text-pink-800 px-2">{amountInCart(stock.id)}</span>
                            <button className="" onClick={() => addToCart(stock,product)}>+</button>
                            </td>
                        </tr>
                        </>
                    ))}
                    </tbody>
                </table>
                </div>
                
        </div>
    )
}

export default ProductPage;