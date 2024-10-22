import './App.css'
import Home from './component/Home';
import NavBare from './component/NavBare';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import './App.css'
import ProductPage from './component/productPage';
import Cart from './component/cart';
import CheckoutPage from './component/checkoutPage';
import Footer from './component/footer';
import Login from './component/login';

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBare/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/product/:id" element={<ProductPage />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>

    </>
  )
}

export default App
