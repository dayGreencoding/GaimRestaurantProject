// src/Components/CustomerDashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

 function CustomerDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'customer') {
      alert('Access denied. Please login as a customer.');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Customer Dashboard</h1>
      <p>Welcome, valued customer!</p>
    </div>
  );
}

export default CustomerDashboard;