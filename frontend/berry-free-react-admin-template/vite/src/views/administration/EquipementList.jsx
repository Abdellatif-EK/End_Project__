// src/views/administration/EquipmentList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, TextField, IconButton, Table, TableBody, TableCell, TableHead, TableRow, MenuItem, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';

const EquipmentList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [users, setUsers] = useState([]);
  const [newUserId, setNewUserId] = useState('');
  const [accessStatus, setAccessStatus] = useState('actif');

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/Equipement');
      setEquipments(response.data);
    } catch (error) {
      console.error('Error fetching equipments:', error);
    }
  };

  const fetchUsers = async (equipmentId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/matrices/${equipmentId}/employes`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewUsers = (equipmentId) => {
    setSelectedEquipment(equipmentId);
    fetchUsers(equipmentId);
  };

  const handleAddUserAccess = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/create-matrice', {
        equipement: selectedEquipment,
        employe: newUserId,
        status: accessStatus,
      });
      // Refresh the user list after adding a new user
      fetchUsers(selectedEquipment);
    } catch (error) {
      console.error('Error adding user access:', error);
    }
  };

  const filteredEquipments = equipments.filter((equipment) =>
    equipment.appareil.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainCard>
      <Typography variant="h4" gutterBottom>
        List of Equipment
      </Typography>
      <TextField
        label="Search Equipment"
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
        {filteredEquipments.map((equipment) => (
          <Grid item xs={12} sm={6} md={4} key={equipment.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{equipment.appareil}</Typography>
                <Typography variant="body2">Model: {equipment.modele}</Typography>
                <Typography variant="body2">Status: {equipment.Etat}</Typography>
                <Button onClick={() => handleViewUsers(equipment.id)} variant="contained" color="primary">
                  View Users
                </Button>
              </CardContent>
              {selectedEquipment === equipment.id && (
                <CardContent>
                  <Typography variant="h6">Users</Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Typography variant="h6" gutterBottom>
                    Add User Access
                  </Typography>
                  <TextField
                    label="User ID"
                    value={newUserId}
                    onChange={(e) => setNewUserId(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <Select
                    value={accessStatus}
                    onChange={(e) => setAccessStatus(e.target.value)}
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="actif">Actif</MenuItem>
                    <MenuItem value="inactif">Inactif</MenuItem>
                  </Select>
                  <Button onClick={handleAddUserAccess} variant="contained" color="primary">
                    Add User Access
                  </Button>
                </CardContent>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default EquipmentList;
