import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ element, roles, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'));

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" />;
  }

  if (roles && user && !roles.includes(user.role)) {
    // Redirect to unauthorized page or show a message
    return <Navigate to="/unauthorized" />;
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
