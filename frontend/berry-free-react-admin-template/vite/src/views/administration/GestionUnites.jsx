import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Modal,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  Autocomplete
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import MainCard from 'ui-component/cards/MainCard';

const GestionUnites = () => {
  const [Unites, setUnites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUniteId, setModalUniteId] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    laboratoire: '',
    responsable: ''
  });
  const [laboratoires, setLaboratoires] = useState([]);
  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    const fetchUnites = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Unite');
        setUnites(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchLaboratoires = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Laboratoire');
        setLaboratoires(response.data);
      } catch (error) {
        console.error('Error fetching laboratoires:', error);
      }
    };

    const fetchEmployes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Employe');
        setEmployes(response.data);
      } catch (error) {
        console.error('Error fetching employes:', error);
      }
    };

    fetchUnites();
    fetchLaboratoires();
    fetchEmployes();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUnites = Unites.filter((Unite) => Unite.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleOpenModal = (Unite = null) => {
    setModalUniteId(Unite ? Unite.id : null);
    setFormData({
      name: Unite ? Unite.name : '',
      description: Unite ? Unite.description : '',
      laboratoire: Unite ? Unite.laboratoire : '', 
      responsable: Unite ? Unite.responsable : ''
    });
    setModalMode(Unite ? 'edit' : 'add');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalUniteId(null);
    setFormData({
      name: '',
      description: '',
      laboratoire: '',
      responsable: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
    if (!formData.laboratoire) {
      alert('Laboratoire is required.');
      return false;
    }
    if (!formData.responsable) {
      alert('Responsable is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const url = `http://127.0.0.1:8000/Unite/${modalUniteId ? modalUniteId + '/' : ''}`;
    const method = modalUniteId ? 'put' : 'post';
    try {
      const response = await axios[method](url, formData);
      const updatedUnites = modalUniteId
        ? Unites.map((lab) => (lab.id === modalUniteId ? response.data : lab))
        : [...Unites, response.data];
      setUnites(updatedUnites);
      handleCloseModal();
    } catch (error) {
      console.error(`Error ${modalMode === 'add' ? 'adding' : 'updating'} Unite:`, error);
    }
  };

  const handleDeleteUnite = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/Unite/${id}/`);
      setUnites(Unites.filter((Unite) => Unite.id !== id));
    } catch (error) {
      console.error('Error deleting Unite:', error);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUnites.length - page * rowsPerPage);

  const visibleRows = stableSort(filteredUnites, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <MainCard>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h1" gutterBottom>
          Gestion des Unites
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
            Ajouter Unite
          </Button>
        </Box>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Toolbar>
            <Typography sx={{ flex: '1 1 100%' }} variant="h2" id="tableTitle" component="div">
              liste des Unites
            </Typography>

            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>

          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell key="name" align="center" padding="normal" sortDirection={orderBy === 'name' ? order : false}>
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
                  <TableCell key="description" align="center" padding="normal" sortDirection={orderBy === 'description' ? order : false}>
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
                {visibleRows.map((Unite, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={Unite.id}>
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                        {Unite.name}
                      </TableCell>
                      <TableCell align="center">{Unite.description}</TableCell>
                      <TableCell align="right">
                        <Grid container spacing={1} direction="row">
                          <Grid item xs={4}>
                            <IconButton aria-label="modifier" onClick={() => handleOpenModal(Unite)}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Grid>
                          <Grid item xs={4}>
                            <IconButton aria-label="delete" onClick={() => handleDeleteUnite(Unite.id)}>
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
            count={filteredUnites.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />

        <Modal open={showModal} onClose={handleCloseModal}>
          <Box sx={{ p: 4, maxWidth: 400, margin: 'auto', marginTop: '10%', backgroundColor: 'white', borderRadius: 2 }}>
            <Typography variant="h6" component="h2">
              {modalMode === 'add' ? 'Add' : 'Edit'} Unite
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Nom" name="name" value={formData.name} onChange={handleInputChange} fullWidth margin="normal" required />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Laboratoire"
                name="laboratoire"
                value={formData.laboratoire}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <Autocomplete
                options={employes}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Responsable" />}
                value={formData.responsable}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, responsable: newValue ? newValue.id : '' });
                }}
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
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
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
  width: 1
};

export default GestionUnites;
