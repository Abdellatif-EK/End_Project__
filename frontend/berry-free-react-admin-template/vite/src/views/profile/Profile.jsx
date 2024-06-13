import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import pic from './profile.jpg';

const ProfileContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  width: '100%',
}));

const GeneralInfoCard = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
}));

const Profile = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [formData, setFormData] = useState({
    username: user?.username || '',
    address: user?.address || ''
  });

  const [modalMode, setModalMode] = useState('edit'); // Add modalMode state
  const [currentUser, setCurrentUser] = useState(user); // Add currentUser state

  if (!user) {
    return <Typography variant="h6">No user data available</Typography>;
  }

  const handleCancel = () => {
    setFormData({
      username: user.username,
      address: user.address || ''
    });
  };

  const onSubmit = async () => { // Removed setSubmitting, resetForm arguments
    const url = modalMode === 'edit' ? `http://localhost:8000/Employe/${currentUser.id}/` : 'http://localhost:8000/register';
    const method = modalMode === 'edit' ? axios.put : axios.post;
  
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      let dataToSend = formData;
      if (modalMode === 'edit' && storedUser) {
        dataToSend = { ...storedUser, ...formData };
        delete dataToSend.last_data;
      }
  
    //   console.log('Submitting data:', dataToSend);
    //   console.log('API URL:', url);
  
      const response = await method(url, dataToSend);
      console.log('Response data:', response.data);
  
      const updatedUser = { ...storedUser, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
  
      // Update currentUser state
      setCurrentUser(updatedUser);
  
      // Reset modalMode
      setModalMode('edit');
  
      // Optionally handle updating users state if needed
  
      // Reset form data
      setFormData({
        username: updatedUser.username,
        address: updatedUser.address || ''
      });
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <ProfileContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <GeneralInfoCard>
            <Typography variant="h6">General Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={onSubmit} sx={{ mr: 2 }}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </GeneralInfoCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <ProfileCard>
            <CardContent>
              <Avatar alt={user.username} src={pic} sx={{ width: 100, height: 100, margin: 'auto' }} />
              <Typography variant="h4" component="div" align="center">{user.username}</Typography>
              <Typography variant="body1" color="textSecondary" align="center">{user.email}</Typography>
              <Typography variant="h6" align="center">Profile Details</Typography>
              <Typography variant="body2" align="center">Role: {user.role}</Typography>
              <Typography variant="body2" align="center">Joined: {new Date(user.date_joined).toLocaleDateString()}</Typography>
              {user.address && <Typography variant="body2" align="center">Address: {user.address}</Typography>}
              {user.phone && <Typography variant="body2" align="center">Phone: {user.phone}</Typography>}
              {user.bio && <Typography variant="body2" align="center">Bio: {user.bio}</Typography>}
            </CardContent>
          </ProfileCard>
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default Profile;
