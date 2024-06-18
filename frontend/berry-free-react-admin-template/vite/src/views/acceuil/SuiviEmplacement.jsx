import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, TextField, Autocomplete } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

const SuiviEmplacement = () => {
  const [codeMachine, setCodeMachine] = useState('');
  const [equipements, setEquipements] = useState([]);
  const [filteredEquipements, setFilteredEquipements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const response = await axios.get('http://localhost:8000/Equipement');
        setEquipements(response.data);
      } catch (error) {
        console.error('Error fetching equipements:', error);
      }
    };

    fetchEquipements();
  }, []);

  const handleInputChange = (event, value) => {
    setCodeMachine(value);
    const filtered = equipements.filter((equipement) =>
      equipement.code.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEquipements(filtered);
  };

  const handleSubmit = () => {
    if (codeMachine) {
      navigate(`/acceuil/emplacement/${codeMachine}`);
    } else {
      alert('Please enter a valid code machine');
    }
  };

  return (
    <MainCard>
      <Container>
        <Typography variant="h1" sx={{ paddingLeft: 0 }}>
          Suivi Emplacement d'équipement
        </Typography>
        <Typography variant="body1" className="para" sx={{ paddingBottom: 2 }}>
          Veuillez entrer le code machine de l'équipement :
        </Typography>
        <Autocomplete
          freeSolo
          options={filteredEquipements.map((equipement) => equipement.code)}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Code Machine"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Suivre
        </Button>
      </Container>
    </MainCard>
  );
};

export default SuiviEmplacement;

