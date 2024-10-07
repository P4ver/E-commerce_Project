import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === parseInt(id))
  );

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} />
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
