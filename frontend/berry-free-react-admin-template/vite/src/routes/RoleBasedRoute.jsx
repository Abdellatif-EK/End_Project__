// RoleBasedRoute.jsx

import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== role) {
    // Redirect to unauthorized page or login page
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleBasedRoute;
