
const Banner = () => {
    return(
        <div className="bg-pink-400 p-4 rounded-lg shadow-md flex items-center justify-center mb-4 ml-48 mr-48">
            <div className="text-white items-center">
                <h1 className="text-4xl font-bold">Welcome to Kawaii Store!</h1>
                <p className="mt-2 text-lg">The cutest items at the best price!</p>
            </div>
            <img src="../public/pngegg.png" alt="Kawaii Store" className="w-48 h-100" />
        </div>
    )
}

export default Banner;