  import React, { createContext, useState } from 'react';
  import axios from 'axios';
  import { Navigate } from 'react-router-dom';

  // Create a context for authentication
  const AuthContext = createContext();

  // AuthProvider component to wrap around the app
  const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email, password) => {
      try {
        const response = await axios.post('http://localhost:8000/login', { email, password });

        if (response.data) {
          // Assuming your backend sends a session or token
          localStorage.setItem('user', JSON.stringify(response.data));
          setIsAuthenticated(true);
          console.log(localStorage.getItem('user'));
          console.log('Login successful');
          return <Navigate to="/acceuil/default" replace/>;
        }
      } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
      }
    };

    const logout = async () => {
      try {
        // Perform logout logic here and update state
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        // Redirect to the specified page after logout
        return <Navigate to="/acceuil/default" />;
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export { AuthContext, AuthProvider }; // Exporting AuthContext and AuthProvider
