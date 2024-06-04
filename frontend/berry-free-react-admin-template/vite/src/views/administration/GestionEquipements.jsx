import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TableSortLabel, Toolbar,
  Typography, Checkbox, IconButton, Tooltip, FormControlLabel,
  Switch, Button, Modal, TextField, Select, MenuItem, InputLabel, FormControl,Grid
} from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import MainCard from 'ui-component/cards/MainCard';
import SendIcon from '@mui/icons-material/Send';
import { MuiFileInput } from 'mui-file-input';

const GestionEquipements = () => {
  const [equipements, setEquipements] = useState([]);
  const [laboratoires, setLaboratoires] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('appareil');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEquipementId, setDeleteEquipementId] = useState(null);
  const [locationImg, setLocationImg] = useState(null);
  const [currentEquipement, setCurrentEquipement] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [formData, setFormData] = useState({
    appareil: '',
    laboratoire: '',
    Etat: '',
    modele: '',
    Code_machine: '',
    Password: '',
    Sauvegarde: '',
    Connecte_reseau: '',
    Connecte_AD: '',
    connecté_imprimante: '',
    planning_sauvegarde: '',
    Logiciel: '',
    version_logiciel: '',
    date_installation: '',
    Version_windows: '',
    Situation: '',
    Fournisseur: '',
    Etat_materiel_informatique: '',
    numero_serie: '',
    image: null
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEquipement(null);
    setFormData({
      appareil: '',
      laboratoire: '',
      Etat: '',
      modele: '',
      Code_machine: '',
      Password: '',
      Sauvegarde: '',
      Connecte_reseau: '',
      Connecte_AD: '',
      connecté_imprimante: '',
      planning_sauvegarde: '',
      Logiciel: '',
      version_logiciel: '',
      date_installation: '',
      Version_windows: '',
      Situation: '',
      Fournisseur: '',
      Etat_materiel_informatique: '',
      numero_serie: '',
      image: null
    });
  };
  


  const handleLocationImgChange = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setLocationImg(event.target.files[0]);
      setFormData({ ...formData, image: event.target.files[0] });
    }
  };

  const handleShowDetails = (equipement) => {
    setCurrentEquipement(equipement);
    setShowDetailsModal(true);
  };
  
  const handleModifyEquipement = (equipement) => {
    setCurrentEquipement(equipement);
    setFormData({
      ...equipement,
      laboratoire: equipement.laboratoire.id,
      image: null,
    });
    setShowModal(true);
  };

  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const equipementsResponse = await axios.get('http://127.0.0.1:8000/Equipement');
        setEquipements(equipementsResponse.data);

        const laboratoiresResponse = await axios.get('http://127.0.0.1:8000/Laboratoire');
        setLaboratoires(laboratoiresResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEquipements();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const getLaboratoireName = (id) => {
    const laboratoire = laboratoires.find((lab) => lab.id === id);
    return laboratoire ? laboratoire.name : '';
  };

  const filteredEquipements = equipements.filter((equipement) =>
    equipement.appareil.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEquipement = () => {
    setShowModal(true);
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setFormData({
  //     appareil: '',
  //     laboratoire: '',
  //   });
  // };

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      setLocationImg({image: e.target.files });
      console.log(e.target.files);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    if (!formData.appareil) {
      alert('Appareil is required.');
      return false;
    }
    if (!formData.laboratoire) {
      alert('Laboratoire is required.');
      return false;
    }
    return true;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) {
  //     return;
  //   }
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/Equipement', formData, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     setEquipements([...equipements, response.data]);
  //     handleCloseModal();
  //   } catch (error) {
  //     if (error.response) {
  //       console.error('Error response:', error.response.data);
  //       alert('Error: ' + JSON.stringify(error.response.data));
  //     } else {
  //       console.error('Error message:', error.message);
  //       alert('Error: ' + error.message);
  //     }
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) {
  //     return;
  //   }
  //   const formDataWithImage = new FormData();
  //   formDataWithImage.append('image', locationImg.image[0]);
  //   Object.keys(formData).forEach((key) => {
  //     formDataWithImage.append(key, formData[key]);
  //   });
  //   console.log(formDataWithImage); // Add this line to log the form data
  //   console.log(formDataWithImage.get('image'));
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/ajouter/equipement', formDataWithImage, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     setEquipements([...equipements, response.data]);
  //     handleCloseModal();
  //   } catch (error) {
  //     // handle error
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    const formDataWithImage = new FormData();
    formDataWithImage.append('image', locationImg?.image?.[0] || formData.image);
    Object.keys(formData).forEach((key) => {
      formDataWithImage.append(key, formData[key]);
    });
  
    try {
      const url = currentEquipement ? `http://127.0.0.1:8000/modifier/equipement/${currentEquipement.id}` : 'http://127.0.0.1:8000/ajouter/equipement';
      const method = currentEquipement ? 'put' : 'post';
      const response = await axios[method](url, formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const updatedEquipements = currentEquipement 
        ? equipements.map((equip) => (equip.id === response.data.id ? response.data : equip)) 
        : [...equipements, response.data];
  
      setEquipements(updatedEquipements);
      handleCloseModal();
    } catch (error) {
      // handle error
    }
  };
  


  const handleDeleteEquipement = (id) => {
    setDeleteEquipementId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteEquipement = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/Equipement/${deleteEquipementId}`);
      setEquipements(equipements.filter((equipement) => equipement.id !== deleteEquipementId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteEquipementId(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredEquipements.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    // const selectedIndex = selected.indexOf(id);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    //   );
    // }
    // setSelected(newSelected);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredEquipements.length - page * rowsPerPage);

  const visibleRows = stableSort(filteredEquipements, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <MainCard>
        <Box sx={{ width: '100%' }}>
        
            <Typography variant="h1" gutterBottom>
                Gestion des Équipements
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
                onClick={handleAddEquipement}
                sx={{ height: '56px' }} // Match the height of the TextField
                >
                Ajouter Equipement
                </Button>
            </Box>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <Toolbar>
                    {selected.length > 0 ? (
                        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                        {selected.length} selected
                        </Typography>
                    ) : (
                        <Typography sx={{ flex: '1 1 100%' }} variant="h3" id="tableTitle" component="div">
                        Liste des equipements
                        </Typography>
                    )}
                    {selected.length > 0 ? (
                        <Tooltip title="Delete">
                        <IconButton>
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
                            // size={dense ? 'small' : 'medium'}
                            size={'small'}
                        >
                              <TableHead>
                                  <TableRow>
                                      {/* <TableCell padding="checkbox">
                                      <Checkbox
                                          color="primary"
                                          indeterminate={selected.length > 0 && selected.length < filteredEquipements.length}
                                          checked={filteredEquipements.length > 0 && selected.length === filteredEquipements.length}
                                          onChange={handleSelectAllClick}
                                          inputProps={{ 'aria-label': 'select all equipements' }}
                                      />
                                      </TableCell> */}

                                      <TableCell
                                      key="appareil"
                                      align="left"
                                      padding="normal"
                                      sortDirection={orderBy === 'appareil' ? order : false}
                                      >
                                      <TableSortLabel
                                          active={orderBy === 'appareil'}
                                          direction={orderBy === 'appareil' ? order : 'asc'}
                                          onClick={(e) => handleRequestSort(e, 'appareil')}
                                      >
                                          Equipement
                                          {orderBy === 'appareil' ? (
                                          <Box component="span" sx={visuallyHidden}>
                                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                          </Box>
                                          ) : null}
                                      </TableSortLabel>
                                      </TableCell>
                                      <TableCell align="center">Image</TableCell>
                                      <TableCell
                                      key="laboratoire"
                                      align="center"
                                      padding="normal"
                                      sortDirection={orderBy === 'laboratoire' ? order : false}
                                      >
                                      <TableSortLabel
                                          active={orderBy === 'laboratoire'}
                                          direction={orderBy === 'laboratoire' ? order : 'asc'}
                                          onClick={(e) => handleRequestSort(e, 'laboratoire')}
                                      >
                                          Laboratoire
                                          {orderBy === 'laboratoire' ? (
                                          <Box component="span" sx={visuallyHidden}>
                                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                          </Box>
                                          ) : null}
                                      </TableSortLabel>
                                      </TableCell>
                                      <TableCell align="center">Code Machine</TableCell>
                                      <TableCell align="center">Model</TableCell>
                                      <TableCell align="center">Etat</TableCell>
                                      <TableCell align="center">Sauvegarde</TableCell>
                                      <TableCell align="center">Actions</TableCell>
                                  </TableRow>
                              </TableHead>


                              <TableBody>
                              {visibleRows.map((equipement, index) => {
                                  const isItemSelected = isSelected(equipement.id);
                                  const labelId = `enhanced-table-checkbox-${index}`;

                                  return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, equipement.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={equipement.id}
                                        selected={isItemSelected}
                                        
                                    >
                                        {/* <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                        </TableCell> */}



                                        <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                                        {equipement.appareil}
                                        </TableCell>

                                        <TableCell>
                                {equipement.image && (
                                  <img
                                    src={`http://127.0.0.1:8000${equipement.image}`}
                                    alt={equipement.appareil}
                                    style={{ width: '100px', height: '80px' }}
                                  />
                                )}
                                        </TableCell>

                                        <TableCell align="center">{getLaboratoireName(equipement.laboratoire)}</TableCell>

                                        <TableCell align="center">{equipement.Code_machine}</TableCell>

                                        <TableCell align="center">{equipement.modele}</TableCell>

                                        <TableCell align="center">{equipement.Etat}</TableCell>

                                        <TableCell align="center">{equipement.Sauvegarde}</TableCell>

                                        <TableCell align="center">
                                            <Grid container spacing={1} direction="row">
                                                
                                                <Grid item xs={4}>
                                                  {/* <Button display="block" variant="contained" color="primary" onClick={() => handleShowDetails(equipement)}>
                                                    Détails
                                                  </Button> */}
                                                  <IconButton aria-label="Detail" onClick={() => handleShowDetails(equipement)}>
                                                        <PreviewIcon color="primary" />
                                                  </IconButton>
                                                </Grid>
                                                <Grid item xs={4}>
                                                  {/* <Button display="block" variant="contained" color="primary" onClick={() => handleModifyEquipement(equipement)}>
                                                    Modifier
                                                  </Button> */}
                                                  <IconButton aria-label="modifier" onClick={() => handleModifyEquipement(equipement)}>
                                                        <EditIcon color="primary" />
                                                  </IconButton>
                                                  
                                                </Grid>
                                                <Grid item xs={4}>
                                                  {/* <Button display="block" variant="contained" color="secondary" onClick={() => handleDeleteEquipement(equipement.id)} startIcon={<DeleteIcon />}>
                                                    Supprimer
                                                  </Button> */}
                                                      <IconButton aria-label="delete" onClick={() => handleDeleteEquipement(equipement.id)}>
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
                    count={filteredEquipements.length}
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
                        <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            minWidth: 300,
                        }}
                        onSubmit={handleSubmit}
                        >
                        <Typography variant="h2" component="h2">
                        {currentEquipement  ? 'Modifier Equipement' : 'Ajouter Equipement'}
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                            <TextField
                                label="Appareil"
                                variant="outlined"
                                name="appareil"
                                value={formData.appareil}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <FormControl fullWidth >
                            <InputLabel id="laboratoire-label">Laboratoire</InputLabel>
                            <Select
                                labelId="laboratoire-label"
                                name="laboratoire"
                                value={formData.laboratoire}
                                onChange={handleInputChange}
                                required
                            >
                                {laboratoires.map((laboratoire) => (
                                <MenuItem key={laboratoire.id} value={laboratoire.id}>
                                    {laboratoire.name}
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>

                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Etat"
                                variant="outlined"
                                name="Etat"
                                value={formData.Etat}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Modèle"
                                variant="outlined"
                                name="modele"
                                value={formData.modele}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Code Machine"
                                variant="outlined"
                                name="Code_machine"
                                value={formData.Code_machine}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                name="Password"
                                value={formData.Password}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Sauvegarde"
                                variant="outlined"
                                name="Sauvegarde"
                                value={formData.Sauvegarde}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Connecté au Réseau"
                                variant="outlined"
                                name="Connecte_reseau"
                                value={formData.Connecte_reseau}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Connecté à l'AD"
                                variant="outlined"
                                name="Connecte_AD"
                                value={formData.Connecte_AD}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Connecté à l'imprimante"
                                variant="outlined"
                                name="connecté_imprimante"
                                value={formData.connecté_imprimante}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Planning de Sauvegarde"
                                variant="outlined"
                                name="planning_sauvegarde"
                                value={formData.planning_sauvegarde}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Logiciel"
                                variant="outlined"
                                name="Logiciel"
                                value={formData.Logiciel}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Version Logiciel"
                                variant="outlined"
                                name="version_logiciel"
                                value={formData.version_logiciel}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Date d'Installation"
                                variant="outlined"
                                name="date_installation"
                                value={formData.date_installation}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Version Windows"
                                variant="outlined"
                                name="Version_windows"
                                value={formData.Version_windows}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Situation"
                                variant="outlined"
                                name="Situation"
                                value={formData.Situation}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Fournisseur"
                                variant="outlined"
                                name="Fournisseur"
                                value={formData.Fournisseur}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="État Matériel Informatique"
                                variant="outlined"
                                name="Etat_materiel_informatique"
                                value={formData.Etat_materiel_informatique}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <TextField
                                label="Numéro de Série"
                                variant="outlined"
                                name="numero_serie"
                                value={formData.numero_serie}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item xs={6}>
                            <input type="file" name="image" accept="image/*" onChange={handleInputChange} />
                            {/* <MuiFileInput name="image" value={locationImg} onChange={handleLocationImgChange} multiple size='small' fullWidth /> */}
                            
                            </Grid>
                        </Grid>

                        <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}>
                            {currentEquipement  ? 'Modifier' : 'Ajouter'}
                        </Button>
                        </Box>
                </Modal>

                <Modal open={showDeleteModal} onClose={handleCloseDeleteModal}>
                    <Box sx={{ p: 4, maxWidth: 400, margin: 'auto', marginTop: '10%', backgroundColor: 'white', borderRadius: 2 }}>
                    <Typography variant="h6" component="h2">
                        Confirmer Suppression
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Est ce que vous etes sur?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={handleCloseDeleteModal} sx={{ mr: 1 }}>
                        Annuler
                        </Button>
                        <Button onClick={confirmDeleteEquipement} variant="contained" color="secondary">
                        Supprimer
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
                        minWidth: 300,
                      }}
                    >
                        <Typography variant="h6" component="h2">
                          Détails de l'équipement
                        </Typography>
                        {currentEquipement && (
                          <Box sx={{ mt: 2 }}>
                            <Typography><strong>Appareil:</strong> {currentEquipement.appareil}</Typography>
                            <Typography><strong>Laboratoire:</strong> {getLaboratoireName(currentEquipement.laboratoire)}</Typography>
                            <Typography><strong>État:</strong> {currentEquipement.Etat}</Typography>
                            <Typography><strong>Modèle:</strong> {currentEquipement.modele}</Typography>
                            <Typography><strong>Code Machine:</strong> {currentEquipement.Code_machine}</Typography>
                            <Typography><strong>Image:</strong></Typography>
                            {currentEquipement.image && (
                              <img
                                src={`http://127.0.0.1:8000${currentEquipement.image}`}
                                alt={currentEquipement.appareil}
                                style={{ width: '100px', height: '100px' }}
                              />
                            )}
                          </Box>
                        )}
                        <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={() => setShowDetailsModal(false)}>
                          Fermer
                        </Button>
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

export default GestionEquipements;