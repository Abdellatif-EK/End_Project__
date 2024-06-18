import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid } from '@mui/material';
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
    transform: 'translate(-50%, -50%)'
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

const Emplacement = () => {
  const { id } = useParams();
  const [position, setPosition] = useState({ top: 50, left: 50 });

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
    try {
      const response = await axios.post(`http://127.0.0.1:8000/emplacement/creer/${id}/`, {
        horizontal: position.left,
        vertical: position.top
      });
      alert('Placement accepted: ' + JSON.stringify(response.data));
    } catch (error) {
      alert('Error in placement: ' + error.message);
    }
  };

  return (
    <MainCard>
      <Container>
        <Typography variant="h1" sx={{ paddingLeft: 0 }}>
          l'emplacement de l'equipement  PH5/HPLC002
        </Typography>
        <Typography variant="body1" className="para" sx={{ paddingBottom: 2 }}>
          La Cartographie du laboratoire <strong>Physico-chimique</strong>
        </Typography>
        <ImageContainer>
          <img src={CartLaboImage} alt="Laboratory" className="cart" />
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
            <Button variant="contained" color="primary" onClick={acceptPlacement} size="large" sx={{ marginLeft: 2 }}>
              Retirer Emplacement
            </Button>
          </Box>
        </Grid>
      </Container>
    </MainCard>
  );
};

export default Emplacement;
