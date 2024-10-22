import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSile';
import { fetchCategories } from '../redux/categorySlice';
import ProductCard from './ProductCard';
import CategoryCard from './categoryCard';
import Slide from './Slider';
import delevry from './images/delevry.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SliderHome from './SliderHome';

function Home() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryVisible, setIsCategoryVisible] = useState(true);
  
  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products when the component mounts
    dispatch(fetchCategories()); // Fetch categories when the component mounts
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  const filteredProducts = selectedCategory
  ? products.filter((product) => product.category_id === selectedCategory)
  : products;


  const toggleCategoryVisibility = () => {
    setIsCategoryVisible((prev) => !prev); // Toggle the visibility
  };
  return (
    <div className='bg-gray-50'>
    {/* <div className='flex flex-col md:flex-row justify-center w-3/4 mx-auto'> */}
    <div className='md:flex w-3/4 mx-auto'>

      <div className='w-full mx-auto md:w-3/4 order-1 md:order-2'>
        <SliderHome/>
      </div>

      <div className='flex my-9 md:m-0 justify-center md:w-[250px]  md:flex-col gap-8'>
        <div className='h-44 w-1/2 md:w-full bg-white border'>
          test
        </div>
        <div className='h-44 w-1/2 md:w-full bg-white border'>
          test
        </div>
      </div>
    </div>

      
    {/* </div> */}
      <div className='flex justify-center w-3/4 mx-auto md:my-8'>
        <Slide/>
      </div>
      
      <div className="home p-4">
        <div className='my-10'>
          <div className='w-3/4 mx-auto'>
            {/* Button to toggle category visibility */}
            <button 
              onClick={toggleCategoryVisibility} 
              className="mb-4 bg-blue-500 text-white px-4 py-2 rounded "
            >
              {isCategoryVisible ? 'Hide Categories' : 'Show Categories'}
            </button>
          </div>
          {/* Sidebar for Categories */}
          {isCategoryVisible && (
            <div className='w-3/4 mx-auto'>
            {/* <div className="sidebar pr-4 max-h-screen sticky top-4 overflow-y-auto hide-scrollbar "> */}
              <h2 className="text-xl font-bold mb-4 ">Categories</h2>
              <div className="flex flex-wrap justify-center">
                {categories.map((category) => (
                  <div className='w-36 m-2 bg-white text-center'>
                    <CategoryCard
                      key={category.id}
                      name={category.name}
                      onClick={() => handleCategoryClick(category.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Section */}
        <div className="products w-3/4 mx-auto">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
