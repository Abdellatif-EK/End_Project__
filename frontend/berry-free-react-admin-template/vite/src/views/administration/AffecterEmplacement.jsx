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

const AffecterEmplacement = () => {
  const { id } = useParams();
  const [equipementid, setEquipementid] = useState([]);
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

  // const requests = newMatrices.map((employeeId) =>
  //   axios.post('http://127.0.0.1:8000/create-matrice', {
  //     equipement: id,
  //     employe: employeeId,
  //     status: 'actif'
  //   })
  // );

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
          Pharma 5 Smart Factory
        </Typography>
        <Typography variant="body1" className="para" sx={{ paddingBottom: 2 }}>
          La Cartographie du laboratoire <strong>Physico-chimique</strong> avec l'emplacement des différents équipements qui y sont utilisés
        </Typography>
        <ImageContainer>
          <img src={CartLaboImage} alt="Laboratory" className="cart" />
          <div className="marqueur" style={{ top: `${position.top}%`, left: `${position.left}%` }}>
            <MapMarkerIcon color="primary" />
          </div>
          <div className="marqueur" style={{ top: '5%', left: '5%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '5%', left: '15%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '5%', left: '25%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '15%', left: '5%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '30%', left: '5%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '45%', left: '5%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '60%', left: '5%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '75%', left: '5%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '90%', left: '5%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '90%', left: '15%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '90%', left: '25%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '80%', left: '25%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '60%', left: '25%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '45%', left: '25%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '30%', left: '25%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '15%', left: '25%' }}>
            <MapMarkerIcon color="blue" />
          </div>

          <div className="marqueur" style={{ top: '65%', left: '40%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '65%', left: '36%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '65%', left: '45%' }}>
            <MapMarkerIcon color="blue" />
          </div>

          <div className="marqueur" style={{ top: '50%', left: '60%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '40%', left: '60%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '30%', left: '60%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '20%', left: '60%' }}>
            <MapMarkerIcon color="blue" />
          </div>

          <div className="marqueur" style={{ top: '91%', left: '60.4%' }}>
            <MapMarkerIcon color="blue" />
          </div>

          <div className="marqueur" style={{ top: '91%', left: '74%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '85%', left: '74%' }}>
            <MapMarkerIcon color="blue" />
          </div>

          <div className="marqueur" style={{ top: '85%', left: '83%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '94%', left: '83%' }}>
            <MapMarkerIcon color="blue" />
          </div>

          <div className="marqueur" style={{ top: '94%', left: '51%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '86%', left: '51%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '86%', left: '51%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '94%', left: '56%' }}>
            <MapMarkerIcon color="blue" />
          </div>

          <div className="marqueur" style={{ top: '94%', left: '42%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '86%', left: '42%' }}>
            <MapMarkerIcon color="blue" />
          </div>

          <div className="marqueur" style={{ top: '88%', left: '37%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '83%', left: '37%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '94%', left: '37%' }}>
            <MapMarkerIcon color="blue" />
          </div>

          <div className="marqueur" style={{ top: '65%', left: '66%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '50%', left: '66%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '40%', left: '66%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '30%', left: '66%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '20%', left: '66%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '10%', left: '66%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '65%', left: '75%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '65%', left: '90%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '65%', left: '95%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '50%', left: '95%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '40%', left: '95%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '30%', left: '95%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '20%', left: '95%' }}>
            <MapMarkerIcon color="blue" />
          </div>
          <div className="marqueur" style={{ top: '10%', left: '95%' }}>
            <MapMarkerIcon color="blue" />
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

export default AffecterEmplacement;
