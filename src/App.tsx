
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import MyNavbar from './components/Navbar'
function App() {

  return (
    <>
    <MyNavbar />
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:category_id" element={<CategoryPage />} />

         </Routes>
      
    </>
  )
}

export default App
