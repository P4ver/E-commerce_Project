import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ toggleCart }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const uniqueCartItems = Array.from(new Map(storedCart.map(item => [item.id, item])).values());
    setCartItems(uniqueCartItems);
  }, []);

  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
      </div>

      <div className="mx-auto mt-8 max-w-2xl md:mt-12">
        <div className="bg-white shadow">
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              <ul className="-my-8">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="shrink-0">
                      <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={item.image} alt={item.name} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-700">{item.description}</p>
                      <p className="text-gray-900 font-bold">{item.price} MAD</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Delete item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t pt-4">
              <h2 className="text-lg font-semibold">Total Price: {calculateTotal()} MAD</h2>
            </div>
          </div>
          <Link to="/checkout">
            <button
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
              onClick={toggleCart} // Close the cart when proceeding to checkout
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

