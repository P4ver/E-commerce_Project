import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSile';
import { fetchCategories } from '../redux/categorySlice';
import ProductCard from './ProductCard';
import CategoryCard from './categoryCard';
import Slide from './Slider';
import delevry from './images/delevry.jpg';
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
    <>
      <div className='flex justify-center'>
        <Slide/>
        {/* <img className='w-96' src={delevry} alt="" /> */}
      </div>
      
      {/* Button to toggle category visibility */}
      <button 
        onClick={toggleCategoryVisibility} 
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isCategoryVisible ? 'Hide Categories' : 'Show Categories'}
      </button>
      <div className="home flex p-4">
      {/* Sidebar for Categories */}
      {isCategoryVisible && (
        <div className="sidebar w-1/4 pr-4 max-h-screen sticky top-4 overflow-y-auto hide-scrollbar ">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-1 text-center md:grid-cols-2 gap-4 mb-8">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Product Section */}
      <div className="products w-3/4">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default Home;
