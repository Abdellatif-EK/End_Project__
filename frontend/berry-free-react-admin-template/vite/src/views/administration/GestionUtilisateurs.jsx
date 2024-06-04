import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TableSortLabel, Toolbar,
  Typography, Checkbox, IconButton, Tooltip, Button, Modal,
  TextField, FormControlLabel, Switch, Select, MenuItem, Grid
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import MainCard from 'ui-component/cards/MainCard';
import { Link } from 'react-router-dom';
import { visuallyHidden } from '@mui/utils'; // Add this import

const GestionUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Employe');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const initialValues = {
    email: '',
    username: '',
    password: '',
    role: 'analyst',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    role: Yup.string().required('Required'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:8000/register', values);
      setUsers([...users, response.data]);
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
    setSubmitting(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteUser = (id) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/Employe/${deleteUserId}`);
      setUsers(users.filter((user) => user.id !== deleteUserId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteUserId(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredUsers.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers.length - page * rowsPerPage);

  return (
    <MainCard>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h1" gutterBottom>
          Gestion des Utilisateurs
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <TextField
            label="Recherche des utilisateurs"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            sx={{ marginRight: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddUser}
            sx={{ height: '56px' }} // Match the height of the TextField
          >
            Ajouter Utilisateur
          </Button>
        </Box>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Toolbar>
            {selected.length > 0 ? (
              <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                {selected.length} selected
              </Typography>
            ) : (
              <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                Utilisateurs
              </Typography>
            )}
            {selected.length > 0 ? (
              <Tooltip title="Delete">
                <IconButton onClick={() => confirmDeleteUser(selected[0])}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Filter list">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < filteredUsers.length}
                      checked={filteredUsers.length > 0 && selected.length === filteredUsers.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all users' }}
                    />
                  </TableCell>
                  <TableCell
                    key="username"
                    align="left"
                    padding="normal"
                    sortDirection={orderBy === 'username' ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === 'username'}
                      direction={orderBy === 'username' ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, 'username')}
                    >
                      Username
                      {orderBy === 'username' ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    key="email"
                    align="left"
                    padding="normal"
                    sortDirection={orderBy === 'email' ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === 'email'}
                      direction={orderBy === 'email' ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, 'email')}
                    >
                      Email
                      {orderBy === 'email' ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    key="role"
                    align="left"
                    padding="normal"
                    sortDirection={orderBy === 'role' ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === 'role'}
                      direction={orderBy === 'role' ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, 'role')}
                    >
                      Role
                      {orderBy === 'role' ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => {
                    const isItemSelected = isSelected(user.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, user.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={user.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {user.username}
                        </TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.role}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" component="h2">
            Ajouter un utilisateur
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="email" />}
                />
                <Field
                  as={TextField}
                  name="username"
                  type="text"
                  label="Username"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="username" />}
                />
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="password" />}
                />
                <Field
                  as={Select}
                  name="role"
                  label="Role"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="analyst">Analyst</MenuItem>
                  <MenuItem value="administrateur">Administrateur</MenuItem>
                  <MenuItem value="Technicien">Technicien</MenuItem>
                </Field>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Ajouter
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                    Annuler
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <Modal open={showDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" component="h2">
            Supprimer l'utilisateur
          </Typography>
          <Typography>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={confirmDeleteUser}>
              Supprimer
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseDeleteModal}>
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>
    </MainCard>
  );
};

export default GestionUtilisateurs;
