import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // লোকাল স্টোরেজে টোকেন আছে কিনা চেক করছি
  const isAuthenticated = localStorage.getItem('adminToken'); 

  if (!isAuthenticated) {
    // লগইন করা না থাকলে লগইন পেজে পাঠিয়ে দেবে
    return <Navigate to="/st-admin-secure/login" replace />;
  }

  return children;
};

export default ProtectedRoute;