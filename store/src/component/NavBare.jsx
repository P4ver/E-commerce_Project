import React, { useState } from 'react';
import Cart from './cart';


const NavBare = () => {
  const [isCartOpen, setIsCartOpen] = useState(false); // State to control cart visibility

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); // Toggle the cart popup
  };

  return (
    <>
      <header className="shadow mb-2">
        <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
          <a href="/" className="flex items-center whitespace-nowrap text-2xl font-black">
            <span className="mr-2 text-4xl text-blue-600">
              {/* SVG icon */}
            </span>
            <span className="text-black">the future</span>
          </a>
          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label className="absolute top-5 right-7 cursor-pointer md:hidden" htmlFor="navbar-open">
            <span className="sr-only">Toggle Navigation</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <nav aria-label="Header Navigation" className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
            <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <li className="text-gray-600 md:mr-12 hover:text-blue-600"><a href="#">Pricing</a></li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600"><a href="#">Features</a></li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600"><a href="#">Support</a></li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <button className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">Login</button>
              </li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <button
                  className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                  onClick={toggleCart} // Toggle cart visibility when clicked
                >
                  Cart
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Conditionally render the Cart popup */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={toggleCart} // Close cart when the close button is clicked
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Cart toggleCart={toggleCart}/>
            {/* <Cart />  */}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBare;


