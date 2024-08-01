
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import MyNavbar from './components/Navbar'
import { CartProvider } from './components/CartContext'
import CartPage from './pages/CartPage'
import ProductPage from './pages/ProductPage'

function App() {
  

  return (
    <>
    <CartProvider>
    <MyNavbar />

      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:category_id/products/" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/:category_id/products/:product_id" element={<ProductPage/>} />
      </Routes>
      </CartProvider>
    </>
  )
}

export default App
