import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  selectContainer: {
    zIndex: 1000, // Ensure the dropdown is above other elements
    maxHeight: '200px', // Limit the height of the dropdown
    overflowY: 'auto' // Add vertical scroll
  },
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  gridContainer: {
    overflow: 'visible' // Ensure the grid container allows overflow
  },
  mainCard: {
    height: '100vh', // Full viewport height
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
  },
  dialog: {
    height: '500px'
  }
}));

const DemandesTraitees = () => {
  const classes = useStyles();
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [equipements, setEquipements] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.id) {
          const response = await axios.get(`http://127.0.0.1:8000/demande/analyste/traite/${storedUser.id}/`);
          const demandesData = response.data;
          const equipementIds = demandesData.map((demande) => demande.equipement);

          const equipements = await Promise.all(
            equipementIds.map((id) => axios.get(`http://127.0.0.1:8000/Equipement/${id}`).then((res) => res.data))
          );

          const demandesWithEquipement = demandesData.map((demande) => ({
            ...demande,
            equipement: equipements.find((equip) => equip.id === demande.equipement)
          }));

          setDemandes(demandesWithEquipement);
        } else {
          setError('No analyste ID found in local storage.');
        }
      } catch (err) {
        console.error('Error fetching demandes:', err);
        setError('Failed to fetch demandes');
      } finally {
        setLoading(false);
      }
    };

    const fetchEquipements = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Equipement');
        setEquipements(
          response.data.map((equipement) => ({
            label: equipement.appareil,
            id: equipement.id
          }))
        );
      } catch (err) {
        console.error('Error fetching equipements:', err);
        setFormError('Failed to fetch equipements');
      }
    };

    fetchDemandes();
    fetchEquipements();
  }, []);

  const handleOpen = (demande) => {
    setSelectedDemande(demande);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDemande(null);
  };

  const handleInputChange = (event) => {
    setSelectedDemande({
      ...selectedDemande,
      [event.target.name]: event.target.value
    });
  };

  const handleEquipementChange = (event, value) => {
    setSelectedDemande({
      ...selectedDemande,
      equipement: value ? value.id : ''
    });
  };

  const handleSubmit = async () => {
    setFormLoading(true);
    setFormError('');
    try {
      const response = await axios.put(`http://127.0.0.1:8000/demande/analyste/update/${selectedDemande.id}/`, selectedDemande);
      const updatedDemande = response.data;

      // Fetch the updated equipement details
      const equipementResponse = await axios.get(`http://127.0.0.1:8000/Equipement/${updatedDemande.equipement}`);
      const updatedEquipement = equipementResponse.data;

      // Update the demande with the new equipement details
      const updatedDemandeWithEquipement = {
        ...updatedDemande,
        equipement: updatedEquipement
      };

      setDemandes(demandes.map((demande) => (demande.id === selectedDemande.id ? updatedDemandeWithEquipement : demande)));
      handleClose();
    } catch (err) {
      console.error('Error updating demande:', err);
      setFormError('Failed to update demande');
    }
    setFormLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/demande/analyste/delete/${id}/`);
      setDemandes(demandes.filter((demande) => demande.id !== id));
      setConfirmOpen(false);
    } catch (err) {
      console.error('Error deleting demande:', err);
      setError('Failed to delete demande');
    }
  };

  const handleConfirmOpen = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    handleDelete(deleteId);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <MainCard className={classes.mainCard}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">État</TableCell>
              <TableCell align="center">Équipement</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demandes.map((demande) => (
              <TableRow key={demande.id}>
                <TableCell component="th" scope="row">
                  {demande.id}
                </TableCell>
                <TableCell align="center">{demande.date_demande}</TableCell>
                <TableCell align="center">{demande.description}</TableCell>
                <TableCell align="center">{demande.etat}</TableCell>
                <TableCell align="center">{demande.equipement.appareil}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" onClick={() => handleOpen(demande)}>
                    Modifier
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleConfirmOpen(demande.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" className={classes.dialog}>
        <DialogTitle variant="h2">Modifier Demande</DialogTitle>
        <DialogContent className={classes.dialog}>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={selectedDemande?.description || ''}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required className={classes.formControl}>
                <Autocomplete
                  disablePortal
                  id="equipement-select"
                  options={equipements}
                  value={equipements.find((e) => e.id === selectedDemande?.equipement) || null}
                  onChange={handleEquipementChange}
                  renderInput={(params) => <TextField {...params} label="Equipement" />}
                />
              </FormControl>
            </Grid>
            {formError && (
              <Grid item xs={12}>
                <Alert severity="error">{formError}</Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={formLoading}>
            {formLoading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Supprimer la demande</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer cette demande ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default DemandesTraitees;
