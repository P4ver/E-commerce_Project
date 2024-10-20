import './App.css'
import Home from './component/Home';
import NavBare from './component/NavBare';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import './App.css'
import ProductPage from './component/productPage';
import Cart from './component/cart';

function App() {
  return (
    <>
      <NavBare/>
       <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductPage />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
