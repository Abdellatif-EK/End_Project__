// src/guards/AuthGuard.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const user = localStorage.getItem('user');

  if (!isAuthenticated && !user) {
    // If the user is not authenticated and no user data in local storage, redirect to the login page
    return <Navigate to="/pages/login/login3" />;
  }

  return children;
};

export default AuthGuard;
