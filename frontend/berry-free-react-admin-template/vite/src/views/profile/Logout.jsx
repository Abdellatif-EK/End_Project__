import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make the API call to log out
      await axios.post('http://127.0.0.1:8000/logout');

      // Remove user data from local storage
      localStorage.removeItem('user');

      // Redirect to the login page
      navigate('/pages/login/login3');
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle any errors that occur during the logout process
    }
  };

  return (
    <MainCard title="Déconnexion">
      <Typography variant="body2">
      Êtes-vous sûr de vouloir vous déconnecter?
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Se deconnecter 
      </Button>
    </MainCard>
  );
};

export default Logout;
