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
  Grid,
  IconButton
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MainCard from 'ui-component/cards/MainCard';
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
  },
  etatNouvelle: {
    backgroundColor: 'red',
    color: 'white'
  },
  etatEnCours: {
    backgroundColor: 'orange',
    color: 'white'
  },
  etatTraite: {
    backgroundColor: 'green',
    color: 'white'
  },
  etatReouverture: {
    backgroundColor: 'red',
    color: 'white'
  }
}));

const DemandesAnalyste = () => {
  const classes = useStyles();
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.id) {
          const response = await axios.get(`http://127.0.0.1:8000/demande/pas/traitee`);
          setDemandes(response.data);
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

    fetchDemandes();
  }, []);

  const handleOpen = (demande) => {
    setSelectedDemande(demande);
    setOpen(true);
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirm = async () => {
    if (selectedDemande) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const technicienId = storedUser ? storedUser.id : null;

        const updateData = { ...selectedDemande, etat: 'traite', technicien: technicienId };
        const response = await axios.put(`http://127.0.0.1:8000/demande/update/${selectedDemande.id}/`, updateData);
        setDemandes(demandes.map((demande) => (demande.id === selectedDemande.id ? response.data : demande)));
        handleConfirmClose();
      } catch (err) {
        console.error('Error updating demande:', err);
        setFormError('Failed to update demande');
      }
    }
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

  const handleSubmit = async () => {
    setFormLoading(true);
    setFormError('');
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const technicienId = storedUser ? storedUser.id : null;
      const updateData = {
        ...selectedDemande,
        technicien: technicienId
      };
      const response = await axios.put(`http://127.0.0.1:8000/demande/update/${selectedDemande.id}/`, updateData);
      setDemandes(demandes.map((demande) => (demande.id === selectedDemande.id ? response.data : demande)));
      handleClose();
    } catch (err) {
      console.error('Error updating demande:', err);
      setFormError('Failed to update demande');
    }
    setFormLoading(false);
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
                <TableCell
                  align="center"
                  className={
                    demande.etat === 'nouvelle'
                      ? classes.etatNouvelle
                      : demande.etat === 'en_cours'
                        ? classes.etatEnCours
                        : demande.etat === 'traite'
                          ? classes.etatTraite
                          : demande.etat === 'reouverture'
                            ? classes.etatReouverture
                            : ''
                  }
                >
                  {demande.etat}
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" onClick={() => handleOpen(demande)}>
                    Traiter
                  </Button>
                  <IconButton
                    onClick={() => {
                      setSelectedDemande(demande);
                      handleConfirmOpen();
                    }}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" className={classes.dialog}>
        <DialogTitle variant="h2">Traiter Demande</DialogTitle>
        <DialogContent className={classes.dialog}>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item xs={12}>
              <TextField
                label="Action"
                variant="outlined"
                name="action"
                value={selectedDemande?.action || ''}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date Début"
                variant="outlined"
                name="date_debut"
                type="date"
                value={selectedDemande?.date_debut || ''}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date Fin"
                variant="outlined"
                name="date_fin"
                type="date"
                value={selectedDemande?.date_fin || ''}
                onChange={handleInputChange}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
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
      <Dialog open={confirmOpen} onClose={handleConfirmClose} fullWidth maxWidth="sm">
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to mark this demande as 'traite'?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default DemandesAnalyste;
