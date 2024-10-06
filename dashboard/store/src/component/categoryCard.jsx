import React from 'react';

function CategoryCard({ name }) {
  return (
    <div className="category-card h-40 bg-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-300 transition-all duration-300 ease-in-out">
      <h2 className="text-lg font-semibold text-gray-700">{name}</h2>
    </div>
  );
}

export default CategoryCard;
