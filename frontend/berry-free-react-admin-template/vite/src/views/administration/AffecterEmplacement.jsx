import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { styled } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MapMarkerIcon from '@mui/icons-material/Room';
import MainCard from 'ui-component/cards/MainCard';
import CartLaboImage from './Cart_labo2.jpg';
import axios from 'axios';

const ImageContainer = styled('div')({
  position: 'relative',
  '.marqueur': {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    transition: 'top 0.1s ease, left 0.1s ease'
  },
  '.cart': {
    width: '100%',
    height: 'auto'
  }
});

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const AffecterEmplacement = () => {
  const { id } = useParams();
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [existingEmplacement, setExistingEmplacement] = useState(null);
  const [emplacements, setEmplacements] = useState([]);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEmplacements = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/Emplacement/`);
        setEmplacements(response.data);
        const emplacement = response.data.find(e => e.Equipement === parseInt(id));
        if (emplacement) {
          setPosition({ top: emplacement.vertical, left: emplacement.horizontal });
          setExistingEmplacement(emplacement);
        }
      } catch (error) {
        console.error('Error fetching emplacements:', error);
      }
    };

    fetchEmplacements();
  }, [id]);

  const moveMarker = (direction) => {
    setPosition((prevPosition) => {
      let { top, left } = prevPosition;
      switch (direction) {
        case 'up':
          top = Math.max(top - 2, 0);
          break;
        case 'down':
          top = Math.min(top + 2, 100);
          break;
        case 'left':
          left = Math.max(left - 2, 0);
          break;
        case 'right':
          left = Math.min(left + 2, 100);
          break;
        default:
          break;
      }
      return { top, left };
    });
  };

  const acceptPlacement = async () => {
    const emplacementData = {
      Equipement: id,
      horizontal: position.left,
      vertical: position.top
    };

    try {
      let response;
      if (existingEmplacement) {
        // Update existing emplacement
        response = await axios.put(`http://127.0.0.1:8000/Emplacement/${existingEmplacement.id}/`, emplacementData);
      } else {
        // Create new emplacement
        response = await axios.post(`http://127.0.0.1:8000/Emplacement/`, emplacementData);
      }

      if (response.status === 201 || response.status === 200) {
        alert(`Placement ${existingEmplacement ? 'updated' : 'created'}: ` + JSON.stringify(response.data));
      }
    } catch (error) {
      alert('Error in placement: ' + error.message);
    }
  };

  const retirerEmplacement = async () => {
    try {
      if (existingEmplacement) {
        await axios.delete(`http://127.0.0.1:8000/Emplacement/${existingEmplacement.id}/`);
        // Redirect or update UI after deletion if necessary
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorDialogOpen(true);
      } else {
        alert('Error deleting emplacement: ' + error.message);
      }
    }
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  return (
    <MainCard>
      <Container>
        <Typography variant="h1" sx={{ paddingLeft: 0 }}>
          Choisir l'emplacement de l'équipement
        </Typography>
        <Typography variant="body1" className="para" sx={{ paddingBottom: 2 }}>
          La Cartographie du laboratoire <strong>Physico-chimique</strong>.
        </Typography>
        <ImageContainer>
          <img src={CartLaboImage} alt="Laboratory" className="cart" />
          {emplacements
            .filter((empl) => empl.Equipement !== parseInt(id)) // Filter out the current equipment
            .map((empl, index) => (
              <div key={index} className="marqueur" style={{ top: `${empl.vertical}%`, left: `${empl.horizontal}%` }}>
                <MapMarkerIcon color="blue" />
              </div>
            ))}
          <div className="marqueur" style={{ top: `${position.top}%`, left: `${position.left}%` }}>
            <MapMarkerIcon color="primary" />
          </div>
        </ImageContainer>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button onClick={() => moveMarker('up')} sx={{ marginBottom: 1 }}>
                <ArrowUpwardIcon />
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button onClick={() => moveMarker('left')}>
                  <ArrowBackIcon />
                </Button>
                <Button onClick={() => moveMarker('right')}>
                  <ArrowForwardIcon />
                </Button>
              </Box>
              <Button onClick={() => moveMarker('down')} sx={{ marginTop: 1 }}>
                <ArrowDownwardIcon />
              </Button>
            </Box>
          </Grid>
          <Box sx={{ paddingLeft: '47%', paddingTop: '3%' }}>
            <Button variant="contained" color="primary" onClick={acceptPlacement} size="large" sx={{ marginRight: 2 }}>
              Accepter Emplacement
            </Button>
            <Button variant="contained" color="primary" onClick={retirerEmplacement} size="large" sx={{ marginLeft: 2 }}>
              Retirer Emplacement
            </Button>
          </Box>
        </Grid>
      </Container>
      <Dialog
        open={errorDialogOpen}
        onClose={handleCloseErrorDialog}
      >
        <DialogTitle>Erreur</DialogTitle>
        <DialogContent>
          <DialogContentText>
            L'équipement n'a pas d'emplacement.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default AffecterEmplacement;
