import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TableSortLabel, Toolbar,
  Typography, Checkbox, IconButton, Tooltip, Button, Modal,
  TextField, FormControlLabel, Switch, MenuItem, Grid
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import PreviewIcon from '@mui/icons-material/Preview'; // Corrected import for PreviewIcon
import FilterListIcon from '@mui/icons-material/FilterList';
import MainCard from 'ui-component/cards/MainCard';
import { Link } from 'react-router-dom';
import { visuallyHidden } from '@mui/utils'; // Add this import

const GestionUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

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

  const handleShowDetails = (user) => {
    setCurrentUser(user);
    setShowDetailsModal(true);
  };

  const handleModifyUser = async (user) => {
    setCurrentUser(user);
    setShowModal(true);
    setModalMode('edit');
  };

  const initialValues = {
    email: '',
    username: '',
    role: '',
  };

  const validationSchema = Yup.object({
    // email: Yup.string()
    //   .email("le format de l'email est invalide")
    //   .required('Required')
    //   .test('is-deliverable', "Email n'existe pas", async (value) => {
    //     const response = await axios.get(
    //       `https://emailvalidation.abstractapi.com/v1/?api_key=bcf1cc2551254dd7ad6756fae7a500bf&email=${encodeURIComponent(value)}`
    //     );
    //     return response.data.is_smtp_valid.value;
    //   }),
    email: Yup.string().email("le format de l'email est invalide").required('Required'),
    username: Yup.string().required('Required'),
    role: Yup.string().required('Required')
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const url = modalMode === 'edit' ? `http://localhost:8000/Employe/${currentUser.id}/` : 'http://localhost:8000/register';
    const method = modalMode === 'edit' ? axios.put : axios.post;
    
    console.log('Submitting data:', values);
    
    method(url, values)
      .then((response) => {
        if (modalMode === 'edit') {
          setUsers(users.map(user => user.id === currentUser.id ? response.data : user));
        } else {
          setUsers([...users, response.data]);
        }
        resetForm();
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });

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
    setModalMode('add');
    setCurrentUser(null);
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
      await axios.delete(`http://127.0.0.1:8000/Employe/${deleteUserId}/`);
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
            <Typography sx={{ flex: '1 1 100%' }} variant="h2" id="tableTitle" component="div">
              Liste des Utilisateurs
            </Typography>
          </Toolbar>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell key="username" align="center" padding="normal" sortDirection={orderBy === 'username' ? order : false}>
                    Nom Complet
                  </TableCell>
                  <TableCell key="email" padding="normal" sortDirection={orderBy === 'email' ? order : false} align="center">
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
                  <TableCell key="role" align="center" padding="normal" sortDirection={orderBy === 'role' ? order : false}>
                    Role
                  </TableCell>
                  <TableCell key="action" align="center" padding="normal" sortDirection={orderBy === 'role' ? order : false}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={user.id}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                        {user.username}
                      </TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.role}</TableCell>
                      <TableCell align="center">
                        <Grid container spacing={1} direction="row">
                          <Grid item xs={4}>
                            <IconButton aria-label="Detail" onClick={() => handleShowDetails(user)}>
                              <PreviewIcon color="primary"/>
                            </IconButton>
                          </Grid>
                          <Grid item xs={4}>
                            <IconButton aria-label="modifier" onClick={() => handleModifyUser(user)}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Grid>
                          <Grid item xs={4}>
                            <IconButton aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
                              <DeleteIcon color="primary" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </TableCell>
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
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
      </Box>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6" component="h2">
            {modalMode === 'edit' ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}
          </Typography>
          <Formik initialValues={currentUser || initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
                  helperText={<ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '1.1em' }} />}
                />
                <Field
                  as={TextField}
                  name="username"
                  type="text"
                  label="Username"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '1.1em' }} />}
                />
                <Field
                  as={TextField}
                  name="role"
                  select
                  label="Role"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="role" component="div" style={{ color: 'red', fontSize: '1.1em' }} />}
                >
                  <MenuItem value="analyst">Analyst</MenuItem>
                  <MenuItem value="administrateur">Administrateur</MenuItem>
                  <MenuItem value="Technicien">Technicien</MenuItem>
                </Field>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {modalMode === 'edit' ? 'Modifier' : 'Ajouter'}
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
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6" component="h2">
            Supprimer l'utilisateur
          </Typography>
          <Typography>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</Typography>
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

      <Modal open={showDetailsModal} onClose={() => setShowDetailsModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 300
          }}
        >
          <Typography variant="h6" component="h2">
            Détails de l'utilisateur
          </Typography>
          {currentUser && (
            <Box sx={{ mt: 2 }}>
              <Typography>
                <strong>Nom Complet:</strong> {currentUser.username}
              </Typography>
              <Typography>
                <strong>Email:</strong> {currentUser.email}
              </Typography>
              <Typography>
                <strong>Role:</strong> {currentUser.role}
              </Typography>
            </Box>
          )}
          <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={() => setShowDetailsModal(false)}>
            Fermer
          </Button>
        </Box>
      </Modal>
    </MainCard>
  );
};

export default GestionUtilisateurs;

