

import { useContext } from "react";
import { Product } from "../interfaces/Product"
import { CartContext } from "../components/CartContext";


function CartPage() {
    const cartContext = useContext(CartContext);
    const { removeFromCart } = cartContext!;
    

return (
    <>
        <div className="bg-pink-200 items-left mx-20 p-10 rounded">
            <h1 className="text-pink-800 font-bold mb-10">Cart</h1>
            
            {cartContext?.cart.length === 0 ? (
        <h3 className="text-pink-800 text-2xl">Your cart is empty</h3>
      ) : (
        <div className="bg-white rounded shadow-md rounded-lg p-4">
                
                {cartContext?.cart.map((product: Product) => (
                    <div key={product.id} className="p-4">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-32 h-32 object-cover mb-4 rounded-lg"
                        />
                        <h2 className="text-xl font-bold mb-2 text-pink-800">{product.name}</h2>
                        <p className="text-pink-700 mb-4">${product.price}</p>
                        <button onClick={() => removeFromCart(product.id)} className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
                            Remove from Cart
                        </button>
                        
                    </div>
                    
                ))}
                <h5 className="text-pink-800 text-4xl m-5 text-right">Total: ${cartContext?.cart.reduce((acc, product) => acc + product.price, 0)}</h5>
            </div>
      )}
        </div>

    </>
  )
}

export default CartPage
