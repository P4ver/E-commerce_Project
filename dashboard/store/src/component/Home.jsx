import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSile';
import { fetchCategories } from '../redux/categorySlice';
import ProductCard from './ProductCard';
import CategoryCard from './categoryCard';

function Home() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [selectedCategory, setSelectedCategory] = useState(null);

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

  return (
    <div className="home flex p-4">
      {/* Sidebar for Categories */}
      <div className="sidebar w-1/4 pr-4 max-h-screen sticky top-4 overflow-y-auto hide-scrollbar">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {categories.map((category) => (
            <CategoryCard
                key={category.id}
                name={category.name}
                onClick={() => handleCategoryClick(category.id)}
                />
          ))}
        </div>

        {/* Additional Sidebar Items */}
        <div className="filters mb-8">
          <h2 className="text-lg font-semibold mb-2">Filters</h2>
          <button className="block w-full py-2 px-4 mb-2 bg-gray-200 rounded">
            Filter by Price
          </button>
          <button className="block w-full py-2 px-4 bg-gray-200 rounded">
            Filter by Rating
          </button>
        </div>

        <div className="popular-categories">
          <h2 className="text-lg font-semibold mb-2">Popular Categories</h2>
          <ul className="list-disc pl-5">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Furniture</li>
            <li>Books</li>
          </ul>
        </div>
      </div>

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
  );
}

export default Home;
