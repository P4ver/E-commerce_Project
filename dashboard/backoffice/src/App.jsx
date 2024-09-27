import { useState } from 'react'
import './App.css'
import Login from './component/login'
import Register from './component/register'
import Dashboard from './component/dashboard';
import PrivateRoute from './component/privateRoute';
import Layout from './component/layout';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ProductComponent from './component/ProductComponent';
import CustomerComponent from './component/CustomerComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}/>
            <Route path="/products" element={<PrivateRoute> <ProductComponent /> </PrivateRoute>}/>
            <Route path="/customer" element={<PrivateRoute> <CustomerComponent /> </PrivateRoute>}/>
          </Route>
          {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route exact path="/cart" element={<Cart />} /> */}
          {/* <Route exact path="/checkout" element={<Checkout />} /> */}
          {/* <Route exact path="/order-history" element={<OrderHistory />} /> */}
          {/* <Route exact path="/product/:id" element={<ProductDetail />} /> */}
          {/* <Route exact path="/category/:id" element={<CategoryProducts />} /> */}
          {/* <Route exact path="/search/:query" element={<SearchProducts />} /> */}
          {/* <Route exact path="/about-us" element={<AboutUs />} /> */}
          {/* <Route exact path="/contact-us" element={<ContactUs />} /> */}
          {/* <Route exact path="/terms-and-conditions" element={<TermsAndConditions />} /> */}
        </Routes>
      </BrowserRouter>
   </>
  )
}

export default App
