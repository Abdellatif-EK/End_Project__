import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, IconButton, Box, Modal, TableBody, Table, Typography, Button, TableContainer, TableHead, Toolbar, TableRow, TableCell, Checkbox, TablePagination, Alert } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import DeleteIcon from '@mui/icons-material/Delete';

const Matrice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [equipement, setequipement] = useState(null);
  const [employees, setemployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [matrices, setmatrices] = useState([]);
  const [deleteMatriceId, setDeleteMatriceId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalPage, setModalPage] = useState(0);
  const [modalRowsPerPage, setModalRowsPerPage] = useState(5);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployees([]);
    setErrorMessage('');
  };

  const handleGiveAccess = () => {
    setShowModal(true);
    fetchAllEmployees();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleModalSearch = (e) => {
    setModalSearchTerm(e.target.value);
  };

  const fetchEquipementDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/Equipement/${id}`);
      setequipement(response.data);
    } catch (error) {
      console.error('Error fetching the equipement details:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/matrices/${id}/employes`);
      setemployees(response.data);
    } catch (error) {
      console.error('Error fetching the employees:', error);
    }
  };

  const fetchMatrices = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/matrices-of-equipement/${id}`);
      setmatrices(response.data);
    } catch (error) {
      console.error('Error fetching the matrices:', error);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/Employe'); // Adjust the API endpoint if necessary
      setAllEmployees(response.data);
    } catch (error) {
      console.error('Error fetching all employees:', error);
    }
  };

  useEffect(() => {
    fetchEquipementDetails();
    fetchEmployees();
    fetchMatrices();
  }, [id]);

  const getMatriceDate = (employeeId) => {
    const matrice = matrices.find((mat) => mat.employe === employeeId);
    return matrice ? matrice.date_acces : 'N/A';
  };

  const handleDeleteMatrice = (id) => {
    setDeleteMatriceId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteMatrice = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/matrice_delete/${deleteMatriceId}`);
      fetchEmployees();
      fetchMatrices();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting matrice:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteMatriceId(null);
  };

  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employeeId)
        ? prevSelected.filter((id) => id !== employeeId)
        : [...prevSelected, employeeId]
    );
  };

  const handleSubmitAccess = async () => {
    try {
      const existingMatrices = matrices.map((mat) => mat.employe);
      const newMatrices = selectedEmployees.filter((employeeId) => !existingMatrices.includes(employeeId));

      if (newMatrices.length === 0) {
        setErrorMessage('l un des employés ou Tous les employés sélectionnés ont déjà accès à cet équipement.');
        return;
      }

      const requests = newMatrices.map((employeeId) =>
        axios.post('http://127.0.0.1:8000/create-matrice', {
          equipement: id,
          employe: employeeId,
          status: "actif",
        })
      );

      await Promise.all(requests);
      fetchEmployees();
      fetchMatrices();
      handleCloseModal();
    } catch (error) {
      console.error('Error creating matrice:', error);
    }
  };

  const filteredEmployees = allEmployees.filter((employee) =>
    employee.username.toLowerCase().includes(modalSearchTerm.toLowerCase())
  );

  const filteredEmployeeList = employees.filter((employee) =>
    employee.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalChangePage = (event, newPage) => {
    setModalPage(newPage);
  };

  const handleModalChangeRowsPerPage = (event) => {
    setModalRowsPerPage(parseInt(event.target.value, 10));
    setModalPage(0);
  };

  if (!equipement) {
    return (
      <div className="container mt-4">
        <h5>Equipement not found</h5>
      </div>
    );
  }

  return (
    <MainCard>
      <Button onClick={() => navigate(-1)}>
        <ArrowCircleLeftIcon sx={{ size: 'medium' }} />
        Retour
      </Button>
      <Toolbar>
          <Typography variant="h2">La matrice d'accés de l'équipement "{equipement.Code_machine}"</Typography>
        </Toolbar>  
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          label="Recherche des Analystes"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGiveAccess}
          sx={{ height: '56px' }} // Match the height of the TextField
        >
          Donner Acces
        </Button>
      </Box>
      <TableContainer>
        
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom Complet</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Date acces</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployeeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employe, index) => (
              <TableRow key={index}>
                <TableCell>{employe.username}</TableCell>
                <TableCell>{employe.email}</TableCell>
                <TableCell>{employe.role}</TableCell>
                <TableCell>{getMatriceDate(employe.id)}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" onClick={() => handleDeleteMatrice(employe.id)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEmployeeList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Modal open={showDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={{ p: 4, maxWidth: 400, margin: 'auto', marginTop: '10%', backgroundColor: 'white', borderRadius: 2 }}>
          <Typography variant="h6" component="h2">
            Confirmer Suppression
          </Typography>
          <Typography sx={{ mt: 2 }}>Est ce que vous etes sur?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleCloseDeleteModal} sx={{ mr: 1 }}>
              Annuler
            </Button>
            <Button onClick={confirmDeleteMatrice} variant="contained" color="secondary">
              Supprimer
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={{ p: 4, maxWidth: 800, margin: 'auto', marginTop: '10%', backgroundColor: 'white', borderRadius: 2 }}>
          <Typography variant="h2" component="h2" gutterBottom>
            Donner l'accés à des analystes.
          </Typography>
          <TextField
            label="Rechercher Employé"
            variant="outlined"
            value={modalSearchTerm}
            onChange={handleModalSearch}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Selectionner</TableCell>
                  <TableCell>Nom Complet</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.slice(modalPage * modalRowsPerPage, modalPage * modalRowsPerPage + modalRowsPerPage).map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={() => handleCheckboxChange(employee.id)}
                      />
                    </TableCell>
                    <TableCell>{employee.username}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredEmployees.length}
              rowsPerPage={modalRowsPerPage}
              page={modalPage}
              onPageChange={handleModalChangePage}
              onRowsPerPageChange={handleModalChangeRowsPerPage}
            />
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button onClick={handleCloseModal} sx={{ marginRight: 1 }}>
              Annuler
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSubmitAccess}>
              Ajouter Accès
            </Button>
          </Box>
        </Box>
      </Modal>
    </MainCard>
  );
};

export default Matrice;
