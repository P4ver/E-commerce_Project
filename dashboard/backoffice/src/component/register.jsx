// src/components/Register.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, password }));
  };

  return (
    <div>
      <h1>Register</h1>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
