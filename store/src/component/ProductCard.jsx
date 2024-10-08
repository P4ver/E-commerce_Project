import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <article className="product-card cart-type-neon h-full transform overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative flex h-48 w-auto cursor-pointer items-center justify-center sm:h-64">
        <span className="sr-only">Product Image</span>
        <img
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="product-image object-contain absolute h-full w-full left-0 top-0 right-0 bottom-0"
          src={product.image}
        />
        {/* Discount Badge */}
        <div className="absolute top-3 right-3 rounded bg-blue-500 px-1.5 text-xs font-semibold leading-6 text-white">
          16%
        </div>
      </div>
      <header className="p-3 md:p-6">
        <div className="mb-2 flex items-center">
          <span className="text-sm font-semibold text-gray-800 md:text-base">${product.price} </span>
          <del className="text-xs text-gray-500 ltr:ml-2 rtl:mr-2 md:text-sm"> $132.00</del>
        </div>
        <h3 className="mb-4 cursor-pointer truncate text-xs text-gray-800 md:text-sm">{product.name}</h3>
        <div>
          <Link
            to={`/product/${product.id}`}
            className="group flex h-7 w-full items-center justify-between rounded bg-gray-100 text-xs text-gray-800 transition-colors hover:border-blue-500 hover:bg-blue-500 hover:text-white focus:border-blue-500 focus:bg-blue-500 focus:text-white focus:outline-0 md:h-9 md:text-sm"
          >
            <span className="flex-1">View Details</span>
            <span className="grid h-7 w-7 place-items-center bg-gray-200 transition-colors duration-200 group-hover:bg-blue-600 group-focus:bg-blue-600 rounded-tr rounded-br md:h-9 md:w-9">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 stroke-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </span>
          </Link>
        </div>
      </header>
    </article>
  );
}

export default ProductCard;
