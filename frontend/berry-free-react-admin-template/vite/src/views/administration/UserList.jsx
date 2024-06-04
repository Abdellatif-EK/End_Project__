// src/views/administration/UserList.jsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import { useHistory } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
const UserList = () => {
  // const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };8

  const handleViewEquipment = (userId) => {
    history.push(`/user/${userId}/equipment`);
  };

  return (
    <MainCard>
      <Typography variant="h4" gutterBottom>
        List of Users
      </Typography>
      <TextField
        label="Search Users"
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <Grid container spacing={3}>
        {['User 1', 'User 2', 'User 3'].map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{user}</Typography>
                <Button onClick={() => handleViewEquipment(index)} variant="contained" color="primary">
                  View Equipment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </MainCard>
  );
};

export default UserList;
