import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../redux/productSile';

const ProductComponent = () => {
  const dispatch = useDispatch();
  
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description:'' });
  const [editProduct, setEditProduct] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false); // State to control Add Product dialog
  const [isEditOpen, setIsEditOpen] = useState(false); // State to control Edit Product dialog

  const { products, status, error } = useSelector((state) => state.products);

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
    setNewProduct({ name: '', price: '', description:'' });
    setIsAddOpen(false); // Close the Add Product dialog
    dispatch(fetchProducts());
  };

  // Update an existing product
  const handleUpdateProduct = async (id) => {
    await dispatch(updateProduct({ id, updatedData: editProduct }));
    setEditProduct(null);
    setIsEditOpen(false); // Close the Edit Product dialog
    dispatch(fetchProducts());
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
    dispatch(fetchProducts());
  };

  // Open the Edit dialog and set the selected product for editing
  const selectProductForEdit = (product) => {
    setEditProduct(product);
    setIsEditOpen(true);
  };

  // Format date
  const formatDate = (productDate) => {
    return new Date(productDate).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Product List</h2>

      {/* Button to trigger Add Product popup */}
      <Button variant="contained" color="primary" onClick={() => setIsAddOpen(true)}>
        Add Product
      </Button>

      {/* Show loading status or error */}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {/* Display the product list in a Material UI table */}
      {status === 'succeeded' && (
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{formatDate(product.created_at)}</TableCell>
                  <TableCell>{formatDate(product.updated_at)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => selectProductForEdit(product)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add Product Dialog */}
      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent
          sx={{ height: '250px', width:'600px',display: 'flex', flexDirection: 'column',gap: '9px',}}
          >
          <TextField
            label="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            sx={{marginTop:'5px'}}
          />
          <TextField
            label="Product Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            type="number"
            className="mb-2"
          />
          <TextField
            label="Product description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            className="mb-2"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddProduct} variant="contained" color="primary">
            Add Product
          </Button>
          <Button onClick={() => setIsAddOpen(false)} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog 
        open={isEditOpen} 
        onClose={() => setIsEditOpen(false)}
        >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent 
          sx={{ height: '300px'}}
          >
          {editProduct && (
            <>
              <TextField
                label="Product Name"
                name="name"
                value={editProduct.name}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: '16px', marginTop:'20px' }}
              />
              <TextField
                label="Product Price"
                name="price"
                value={editProduct.price}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                type="number"
                sx={{ marginBottom: '16px' }}
              />
              <TextField
                label="Product Description"
                name="description"
                value={editProduct.description}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleUpdateProduct(editProduct.id)}
            variant="contained"
            color="primary"
          >
            Update Product
          </Button>
          <Button onClick={() => setIsEditOpen(false)} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductComponent;
