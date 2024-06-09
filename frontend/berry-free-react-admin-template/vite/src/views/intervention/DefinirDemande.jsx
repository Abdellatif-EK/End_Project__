import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { Button, TextField, FormControl, Grid, CircularProgress, Typography, Alert } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  gridContainer: {
    overflow: 'visible' // Ensure the grid container allows overflow
  }
}));

const DefinirDemande = () => {
  const classes = useStyles();
  const [demandeDetails, setDemandeDetails] = useState({
    description: '',
    equipement: '',
    analyste: ''
  });
  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const equipementsResponse = await axios.get('http://127.0.0.1:8000/Equipement');
        setEquipements(
          equipementsResponse.data.map((equipement) => ({
            label: equipement.appareil,
            id: equipement.id
          }))
        );
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      }
    };

    // Fetch equipements on component mount
    fetchEquipements();

    // Retrieve analyste from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id) {
      setDemandeDetails((prevDetails) => ({
        ...prevDetails,
        analyste: storedUser.id
      }));
    }
  }, []);

  const handleInputChange = (event) => {
    setDemandeDetails({
      ...demandeDetails,
      [event.target.name]: event.target.value
    });
  };

  const handleEquipementChange = (event, value) => {
    setDemandeDetails({
      ...demandeDetails,
      equipement: value ? value.id : ''
    });
  };

  const handleSubmit = async () => {
    if (!demandeDetails.description || !demandeDetails.equipement) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/demande/definir', {
        ...demandeDetails,
        date_demande: new Date().toISOString().slice(0, 10) // Automatically set today's date
      });
      console.log('Demande added:', response.data);
      setDemandeDetails({ description: '', equipement: '', analyste: demandeDetails.analyste });
    } catch (err) {
      console.error('Error adding demande:', err);
      setError('Failed to add demande');
    }
    setLoading(false);
  };

  return (
    <MainCard className={classes.mainCard}>
      <div className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Definir Nouvelle Demande
        </Typography>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={demandeDetails.description}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required className={classes.formControl}>
              <Autocomplete
                disablePortal
                id="equipement-select"
                options={equipements}
                value={equipements.find((e) => e.id === demandeDetails.equipement) || null}
                onChange={handleEquipementChange}
                renderInput={(params) => <TextField {...params} label="Equipement" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading} fullWidth>
              {loading ? <CircularProgress size={24} /> : 'Envoyer Demande'}
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
        </Grid>
      </div>
    </MainCard>
  );
};

export default DefinirDemande;
