
const OrderPlaced = () => {
    
    return (
        
        <div className="bg-pink-400 p-4 pb-0 rounded-lg shadow-md flex items-center justify-center mb-4 ml-48 mr-48">
            <img src="../public/success.png" alt="success order image" className="h-80" />
        <div className="text-white ">
            <h1 className="text-4xl font-bold">Your order was succesfully placed!</h1>
            <p className="mt-2 text-lg">Thank you for your order! You'll be receiving an e-mail with your order's details!</p>
            
        </div>
        </div>
    
    )
}

export default OrderPlaced;