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
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } from '../redux/customerSlice';

const CustomerComponent = () => {
  const dispatch = useDispatch();
  
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '', phone:'', address:'' });
  const [editCustomer, setEditCustomer] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false); // State to control Add Customer dialog
  const [isEditOpen, setIsEditOpen] = useState(false); // State to control Edit Customer dialog

  const { customers, status, error } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editCustomer) {
      setEditCustomer({ ...editCustomer, [name]: value });
    } else {
      setNewCustomer({ ...newCustomer, [name]: value });
    }
  };

  // Add a new customer
  const handleAddCustomer = async () => {
    await dispatch(addCustomer(newCustomer));
    setNewCustomer({ name: '', phone: '', email: '', phone:'', address:'' });
    setIsAddOpen(false); // Close the Add Customer dialog
    dispatch(fetchCustomers());
  };

  // Update an existing customer
  const handleUpdateCustomer = async (id) => {
    await dispatch(updateCustomer({ id, updatedData: editCustomer }));
    setEditCustomer(null);
    setIsEditOpen(false); // Close the Edit Customer dialog
    dispatch(fetchCustomers());
  };

  // Delete a customer
  const handleDeleteCustomer = async (id) => {
    await dispatch(deleteCustomer(id));
    dispatch(fetchCustomers());
  };

  // Open the Edit dialog and set the selected customer for editing
  const selectCustomerForEdit = (customer) => {
    setEditCustomer(customer);
    setIsEditOpen(true);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customer List</h2>

      {/* Button to trigger Add Customer popup */}
      <Button variant="contained" color="primary" onClick={() => setIsAddOpen(true)}>
        Add Customer
      </Button>

      {/* Show loading status or error */}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {/* Display the customer list in a Material UI table */}
      {status === 'succeeded' && (
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Mail</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => selectCustomerForEdit(customer)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteCustomer(customer.id)}
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

      {/* Add Customer Dialog */}
      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent
          sx={{ height: '310px', width:'600px', display: 'flex', flexDirection: 'column', gap: '9px' }}
        >
          <TextField
            label="Customer Name"
            name="name"
            value={newCustomer.name}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            sx={{ marginTop: '5px' }}
          />
          <TextField
            label="Customer Phone"
            name="phone"
            value={newCustomer.phone}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            className="mb-2"
          />
          <TextField
            label="Customer Mail"
            name="email"
            value={newCustomer.email}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            className="mb-2"
          />
          <TextField
            label="Customer Address"
            name="address"
            value={newCustomer.address}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            className="mb-2"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCustomer} variant="contained" color="primary">
            Add Customer
          </Button>
          <Button onClick={() => setIsAddOpen(false)} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog 
        open={isEditOpen} 
        onClose={() => setIsEditOpen(false)}
      >
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent 
          sx={{ height: '300px' }}
        >
          {editCustomer && (
            <>
              <TextField
                label="Customer Name"
                name="name"
                value={editCustomer.name}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: '16px', marginTop: '20px' }}
              />
              <TextField
                label="Customer Phone"
                name="phone"
                value={editCustomer.phone}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: '16px' }}
              />
              <TextField
                label="Customer Mail"
                name="email"
                value={editCustomer.email}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: '16px' }}
              />
              <TextField
                label="Customer Address"
                name="address"
                value={editCustomer.address}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleUpdateCustomer(editCustomer.id)}
            variant="contained"
            color="primary"
          >
            Update Customer
          </Button>
          <Button onClick={() => setIsEditOpen(false)} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerComponent;
