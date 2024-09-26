import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../redux/productSile';

const ProductComponent = () => {
  const dispatch = useDispatch();
  
  // State to handle product form
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editProduct, setEditProduct] = useState(null);
  
  // Access product state from the Redux store
  const { products, status, error } = useSelector((state) => state.products);
  
  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editProduct) {
      setEditProduct({ ...editProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Add a new product
  const handleAddProduct = async () => {
    await dispatch(addProduct(newProduct));
    setNewProduct({ name: '', price: '' });
    dispatch(fetchProducts()); // Refetch the products after adding
  };

  // Update an existing product
  const handleUpdateProduct = async (id) => {
    await dispatch(updateProduct({ id, updatedData: editProduct }));
    setEditProduct(null);
    dispatch(fetchProducts()); // Refetch the products after updating
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
    dispatch(fetchProducts()); // Refetch the products after deleting
  };

  // Select product for editing
  const selectProductForEdit = (product) => {
    setEditProduct(product);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Product List</h2>

      {/* Form for adding/updating product */}
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={editProduct ? editProduct.name : newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="border border-gray-300 p-2 mr-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={editProduct ? editProduct.price : newProduct.price}
          onChange={handleInputChange}
          placeholder="Product Price"
          className="border border-gray-300 p-2 mr-2 rounded"
        />
        <button
          onClick={editProduct ? () => handleUpdateProduct(editProduct.id) : handleAddProduct}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editProduct ? 'Update Product' : 'Add Product'}
        </button>
        {editProduct && (
          <button
            onClick={() => setEditProduct(null)}
            className="bg-gray-500 text-white p-2 rounded ml-2"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Show loading status or error */}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {/* Display the product list in a table */}
      {status === 'succeeded' && (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 px-2">{product.name}</td>
                <td className="border border-gray-300 px-2">${product.price}</td>
                <td className="border border-gray-300 px-2">
                  <button
                    onClick={() => selectProductForEdit(product)}
                    className="bg-yellow-500 text-white px-1 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-1 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductComponent;
