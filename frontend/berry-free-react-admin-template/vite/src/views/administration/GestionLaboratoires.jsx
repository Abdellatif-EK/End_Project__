import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TableSortLabel, Toolbar,
  Typography, Checkbox, IconButton, Tooltip, Button, Modal,
  TextField, FormControlLabel, Switch,Grid
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import MainCard from 'ui-component/cards/MainCard';

const GestionLaboratoires = () => {
  const [laboratoires, setLaboratoires] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalLaboratoireId, setModalLaboratoireId] = useState(null);
  const [modalMode, setModalMode] = useState('add'); 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchLaboratoires = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Laboratoire');
        setLaboratoires(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLaboratoires();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLaboratoires = laboratoires.filter((laboratoire) =>
    laboratoire.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (laboratoire = null) => {
    setModalLaboratoireId(laboratoire ? laboratoire.id : null);
    setFormData({
      name: laboratoire ? laboratoire.name : '',
      description: laboratoire ? laboratoire.description : '',
    });
    setModalMode(laboratoire ? 'edit' : 'add');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalLaboratoireId(null);
    setFormData({
      name: '',
      description: '',
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name) {
      alert('Name is required.');
      return false;
    }
    if (!formData.description) {
      alert('Description is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const url = `http://127.0.0.1:8000/Laboratoire/${modalLaboratoireId ? modalLaboratoireId + '/' : ''}`;
    const method = modalLaboratoireId ? 'put' : 'post';
    try {
      const response = await axios[method](url, formData);
      const updatedLaboratoires = modalLaboratoireId
        ? laboratoires.map((lab) => (lab.id === modalLaboratoireId ? response.data : lab))
        : [...laboratoires, response.data];
      setLaboratoires(updatedLaboratoires);
      handleCloseModal();
    } catch (error) {
      console.error(`Error ${modalMode === 'add' ? 'adding' : 'updating'} laboratoire:`, error);
    }
  };

  const handleDeleteLaboratoire = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/Laboratoire/${id}/`);
      setLaboratoires(laboratoires.filter((laboratoire) => laboratoire.id !== id));
    } catch (error) {
      console.error('Error deleting laboratoire:', error);
    }
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredLaboratoires.length - page * rowsPerPage);

  const visibleRows = stableSort(filteredLaboratoires, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <MainCard>
    <Box sx={{ width: '100%' }}>
        <Typography variant="h1" gutterBottom>
                Gestion des Laboratoires
            </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <TextField
              label="Recherche des équipements"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              sx={{ marginRight: 2 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOpenModal()}
              sx={{ height: '56px' }} // Match the height of the TextField
            >
              Ajouter Laboratoire
            </Button>
          </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography sx={{ flex: '1 1 100%' }} variant="h2" id="tableTitle" component="div">
            liste des Laboratoires
          </Typography>

          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>

        <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    key="name"
                    align="center"
                    padding="normal"
                    sortDirection={orderBy === 'name' ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, 'name')}
                    >
                      Name
                      {orderBy === 'name' ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    key="description"
                    align="center"
                    padding="normal"
                    sortDirection={orderBy === 'description' ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === 'description'}
                      direction={orderBy === 'description' ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, 'description')}
                    >
                      description
                      {orderBy === 'description' ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((laboratoire, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={laboratoire.id}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                        {laboratoire.name}
                      </TableCell>
                      <TableCell align="center">{laboratoire.description}</TableCell>
                      <TableCell align="right">
                        <Grid container spacing={1} direction="row">
                          <Grid item xs={4}>
                            <IconButton aria-label="modifier" onClick={() => handleOpenModal(laboratoire)}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Grid>
                          <Grid item xs={4}>
                            <IconButton aria-label="delete" onClick={() => handleDeleteLaboratoire(laboratoire.id)}>
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
            count={filteredLaboratoires.length}
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

      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={{ p: 4, maxWidth: 400, margin: 'auto', marginTop: '10%', backgroundColor: 'white', borderRadius: 2 }}>
          <Typography variant="h6" component="h2">
            {modalMode === 'add' ? 'Add' : 'Edit'} Laboratoire
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
    </MainCard>
  );
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 20,
  width: 1,
};

export default GestionLaboratoires;
