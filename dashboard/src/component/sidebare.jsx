import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { TbTruckDelivery, TbTruckReturn, TbArrowBadgeRight } from "react-icons/tb";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { SlBasket, SlArrowDown, SlArrowUp } from "react-icons/sl";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
// import { fetchUserData } from '../store/userSlice';
const Sidebare = () => {
  return (
  <div class="h-screen w-64 pb-10">
  <div class="flex h-full flex-grow flex-col overflow-y-auto rounded-br-lg rounded-tr-lg bg-white pt-5 shadow-md">
    <div class="flex mt-10 items-center px-4">
      <img class="h-12 w-auto max-w-full align-middle" src="/images/R-Wx_NHvZBci3KLrgXhp1.png" alt="" />
      <div class="flex ml-3 flex-col">
        <h3 class="font-medium">Sarah Carter</h3>
        <p class="text-xs text-gray-500">Sr. Engineer</p>
      </div>
    </div>

    <span class="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Analytics</span>

    <div class="flex mt-3 flex-1 flex-col">
      <div class="">
        <nav class="flex-1">
          <a href="/dashboard" title="" class="flex cursor-pointer items-center border-l-4 border-l-rose-600 py-2 px-4 text-sm font-medium text-rose-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4">
            <svg class="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" class=""></path>
            </svg>
            Dashboard
          </a>



          <a href="#" class="flex cursor-pointer items-center border-l-rose-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
            <svg class="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>

            Messages
            <span class="ml-auto rounded-full bg-rose-600 px-2 text-xs text-white">6</span>
          </a>

        </nav>

        <span class="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Product Mangement</span>

        <nav class="flex-1">
          <a href="/products" class="flex cursor-pointer items-center border-l-rose-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
            <svg class="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" class=""></path>
            </svg>
            Products
          </a>

          <a href="#" class="flex cursor-pointer items-center border-l-rose-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
            <svg class="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Orders
          </a>
          <a href="/customer" class="flex cursor-pointer items-center border-l-rose-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
            <svg class="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>

            Customers
          </a>
        </nav>

        {/* <span class="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Content Management</span>

        <nav class="flex-1">
          <a href="#" class="flex cursor-pointer items-center border-l-rose-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
            <svg class="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Blogs
          </a>
        </nav> */}
      </div>
    </div>
  </div>
    </div>

  )
}

export default Sidebare

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// // import { TbTruckDelivery, TbTruckReturn, TbArrowBadgeRight } from "react-icons/tb";
// import { BiPurchaseTagAlt } from "react-icons/bi";
// import { FaRegUser } from "react-icons/fa6";
// import { AiOutlineProduct } from "react-icons/ai";
// import { SlBasket, SlArrowDown, SlArrowUp } from "react-icons/sl";
// import { RxDashboard } from "react-icons/rx";
// import { CgProfile } from "react-icons/cg";
// // import { fetchUserData } from '../store/userSlice';

// const SideBare = () => {
//   return (
//     <div class="min-h-screen flex flex-row bg-gray-100">
//     <div class="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
//         <div class="flex items-center justify-center h-20 shadow-md">
//         <h1 class="text-3xl uppercase text-indigo-500">Logo</h1>
//         </div>
//         <ul class="flex flex-col py-4">
//         <li>
//             <a href="/dashboard" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
//             <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
//             <span class="text-sm font-medium">Dashboard</span>
//             </a>
//         </li>
//         <li>
//             <a href="/products" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
//             <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-music"></i></span>
//             <span class="text-sm font-medium">products</span>
//             </a>
//         </li>
//         <li>
//             <a href="/customer" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
//             <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-music"></i></span>
//             <span class="text-sm font-medium">customer</span>
//             </a>
//         </li>
//         <li>
//             <a href="/products" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
//             <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-music"></i></span>
//             <span class="text-sm font-medium">Orders</span>
//             </a>
//         </li>
//         </ul>
//     </div>
//     </div>
//   );
// };

// export default SideBare;