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
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../redux/productSile';
import { fetchCategories} from '../redux/categorySlice'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { API_LINK } from '../API_LINK';
const ProductComponent = () => {
  const dispatch = useDispatch();
  
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category_id: '', image: null }); // Include category_id
  const [editProduct, setEditProduct] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false); // State to control Add Product dialog
  const [isEditOpen, setIsEditOpen] = useState(false); // State to control Edit Product dialog
  const [selectedCategory, setSelectedCategory] = useState(''); // State for category selection
  // const [categoryAssignments, setCategoryAssignments] = useState({});


  const { products, status, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories); // Assuming categories are in the category slice
  console.log("==> category selection", categories)
  console.log("==> products selection", products)
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
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
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    formData.append('category_id', newProduct.category_id);
    formData.append('image', newProduct.image); // Append the image file
    await dispatch(addProduct(formData));
    setNewProduct({ name: '', price: '', description: '', category_id: '', image: null }); // Reset form
    setIsAddOpen(false); // Close the Add Product dialog
    dispatch(fetchProducts());
  };

  // Update an existing product
  const handleUpdateProduct = async (id) => {
    const formData = new FormData();
    formData.append('name', editProduct.name);
    formData.append('price', editProduct.price);
    formData.append('description', editProduct.description);
    formData.append('category_id', editProduct.category_id);
    
    if (typeof editProduct.image !== 'string' && editProduct.image) {
      formData.append('image', editProduct.image); // Only append if it's a file
    }
    
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    console.log("formData", formData);
    console.log("editProduct", editProduct);
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

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // if (e.target.value) {
    //   dispatc(e.target.value)); // Dispatch action to filter products by category
    // } else {
    //   dispatch(fetchProducts()); // Fetch all products if no category is selected
    // }
  };

    // Handle category selection for the new product
  const handleCategorySelectChange = (e) => {
    setNewProduct({ ...newProduct, category_id: e.target.value });
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

    {/* Category selection */}
    <FormControl fullWidth variant="outlined" className="mb-4">
        <InputLabel id="category-label">Select Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Select Category"
        >
          <MenuItem value="">
            <em>All Products</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
                <TableCell>k</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Category</TableCell>
                {/* <TableCell>CategoryEDT</TableCell> */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .filter((product) =>
                  selectedCategory ? product.category_id === selectedCategory : true
                )
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img src={`${API_LINK}/${product.image}`} alt="" />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{formatDate(product.created_at)}</TableCell>
                    <TableCell>{formatDate(product.updated_at)}</TableCell>
                    <TableCell>
                      {categories.find((cat) => cat.id === product.category_id)?.name || <em>None</em>}
                    </TableCell>
                    <TableCell>
                      <button onClick={() => selectProductForEdit(product)} className="mr-2">
                        <MdEdit />
                      </button>
                      <button color="error" onClick={() => handleDeleteProduct(product.id)}>
                        <MdDelete />
                      </button>
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
          <FormControl fullWidth>
            <InputLabel id="add-category-label">Category</InputLabel>
            <Select
              labelId="add-category-label"
              value={newProduct.category_id}
              onChange={handleCategorySelectChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="file" // Set type to file
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })} // Set the selected file in state
            variant="outlined"
            fullWidth
            // inputProps={{ accept: 'image/*' }} // Allow only image files
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
              <FormControl fullWidth>
                <InputLabel id="edit-category-label">Category</InputLabel>
                <Select
                  labelId="edit-category-label"
                  name="category_id"
                  value={editProduct.category_id}
                  onChange={handleInputChange}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                type="file" 
                onChange={(e) => setEditProduct({ ...editProduct, image: e.target.files[0] })}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: '16px' }}
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
