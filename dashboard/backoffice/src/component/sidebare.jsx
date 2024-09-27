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

const SideBare = () => {
  return (
    <div class="min-h-screen flex flex-row bg-gray-100">
    <div class="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
        <div class="flex items-center justify-center h-20 shadow-md">
        <h1 class="text-3xl uppercase text-indigo-500">Logo</h1>
        </div>
        <ul class="flex flex-col py-4">
        <li>
            <a href="/dashboard" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
            <span class="text-sm font-medium">Dashboard</span>
            </a>
        </li>
        <li>
            <a href="/products" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-music"></i></span>
            <span class="text-sm font-medium">products</span>
            </a>
        </li>
        <li>
            <a href="/customer" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-music"></i></span>
            <span class="text-sm font-medium">customer</span>
            </a>
        </li>
        <li>
            <a href="/products" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-music"></i></span>
            <span class="text-sm font-medium">Orders</span>
            </a>
        </li>
        <li>
            <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-drink"></i></span>
            <span class="text-sm font-medium">Drink</span>
            </a>
        </li>
        {/* <li>
            <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-shopping-bag"></i></span>
            <span class="text-sm font-medium">Shopping</span>
            </a>
        </li>
        <li>
            <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-user"></i></span>
            <span class="text-sm font-medium">Profile</span>
            </a>
        </li>
        <li>
            <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-bell"></i></span>
            <span class="text-sm font-medium">Notifications</span>
            <span class="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">5</span>
            </a>
        </li>
        <li>
            <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-log-out"></i></span>
            <span class="text-sm font-medium">Logout</span>
            </a>
        </li> */}
        </ul>
    </div>
    </div>
  );
};

export default SideBare;