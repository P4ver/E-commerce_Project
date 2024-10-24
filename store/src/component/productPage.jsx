import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProductPage = () => {
      const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products from local storage or define a dummy product array
    const productsFromStorage = JSON.parse(localStorage.getItem('products')) || [];
    // Find the product by ID from the Redux store
    const foundProduct = products.find((product) => product.id === parseInt(id));
    setProduct(foundProduct);
  }, [id, products]);
  
  const handleAddToCart = () => {
    // Get the existing cart from localStorage or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    // Add the selected product to the cart
    const updatedCart = [...existingCart, product];
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };
  
  if (!product) {
    return <p>Product not found...</p>;
  }
  
  return (
    <section class="py-12  sm:py-16 md:px-32"> 
        <div class="container mx-auto px-4">
            <div class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div class="lg:col-span-3 lg:row-end-1">
                <div class="lg:flex lg:items-start">
                <div class="border lg:order-2 lg:ml-5">
                    <div class="max-w-xl overflow-hidden rounded-lg">
                        <img class="h-full w-full max-w-full object-cover" src={product.image} alt="" />
                    </div>
                </div>
                {/* additional images */}
                
                {/* <div class="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                    <div class="flex flex-row items-start lg:flex-col">
                    <button type="button" class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
                        <img class="h-full w-full object-cover" src="/images/JHxMnVrtPMdcNU1s_7g7f.png" alt="" />
                    </button>
                    <button type="button" class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
                        <img class="h-full w-full object-cover" src="/images/JHxMnVrtPMdcNU1s_7g7f.png" alt="" />
                    </button>
                    <button type="button" class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
                        <img class="h-full w-full object-cover" src="/images/JHxMnVrtPMdcNU1s_7g7f.png" alt="" />
                    </button>
                    </div>
                </div> */}
                </div>
            </div>

            <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                <h1 class="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
                {/* rating */}
                <div class="mt-5 flex items-center">
                    <div class="flex items-center">
                        <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                        </svg>
                        <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                        </svg>
                        <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                        </svg>
                        <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                        </svg>
                        <svg class="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" class=""></path>
                        </svg>
                    </div>
                    <p class="ml-2 text-sm font-medium text-gray-500">1,209 Reviews</p>
                </div>
                <p class="mt-4 text-xl font-bold">Description</p>
                <p class="mt-2">{product.description}</p>

                <div class="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div class="flex items-end">
                    <h1 class="text-4xl font-bold">${product.price}</h1>
                </div>

                <button
                    onClick={handleAddToCart} 
                    type="button" class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to cart
                </button>
                </div>


                <ul class="mt-8 space-y-2">
                <li class="flex items-center text-left text-sm font-medium text-gray-600">
                    <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" class=""></path>
                    </svg>
                    Free shipping worldwide
                </li>

                <li class="flex items-center text-left text-sm font-medium text-gray-600">
                    <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" class=""></path>
                    </svg>
                    Cancel Anytime
                </li>
                </ul>
            </div>

            <div class="lg:col-span-3">
                <div class="border-b border-gray-300">
                <nav class="flex gap-4">
                    <a href="#" title="" class="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </a>

                    <a href="#" title="" class="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600">
                    Reviews
                    <span class="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100"> 1,209 </span>
                    </a>
                </nav>
                </div>

                <div class="mt-8 flow-root sm:mt-12">
                <h1 class="text-3xl font-bold">Delivered To Your Door</h1>
                <p class="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium nesciunt fuga.</p>
                <h1 class="mt-8 text-3xl font-bold">From the Fine Farms of Brazil</h1>
                <p class="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio numquam enim facere.</p>
                <p class="mt-4">Amet consectetur adipisicing elit. Optio numquam enim facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum nostrum eius facere, ad neque.</p>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default ProductPage