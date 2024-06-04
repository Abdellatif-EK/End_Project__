// src/views/laboratories/LaboratoireMicrobiologie.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import MapMarkerIcon from '@mui/icons-material/Room';
import MainCard from 'ui-component/cards/MainCard';
import CartLaboImage from './Cart_labo_1.jpg';

const ImageContainer = styled('div')({
  position: 'relative',
  '.marqueur': {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
  '.cart': {
    width: '100%',
    height: 'auto',
  },
});

const LaboratoireMicrobiologie = () => (
  <MainCard>
    <Container>
      <Typography variant="h1" sx={{ paddingLeft: 0 }}>
        Pharma 5 Smart Factory
      </Typography>
      <Typography variant="body1" className="para" sx={{ paddingBottom: 2 }}>
        La Cartographie du laboratoire <strong>de Microbiologie</strong> avec l'emplacement des différents équipements qui y sont utilisés
      </Typography>
      <ImageContainer>
        <img id="image-marqueurs" src={CartLaboImage} alt="Description de l'image" className="cart" />
        <div className="Hôte a flux laminaire">
          <div className="marqueur" style={{ top: '7%', left: '79.5%' }}>
            <Button size="small" component={Link} to="/administration/appareil-detail/29">
              <MapMarkerIcon />
            </Button>
          </div>
          {/* <div className="marqueur" style={{ top: '14%', left: '68.5%' }}>
            <Button size="small" component={Link} to="/administration/appareil-detail/17">
              <MapMarkerIcon />
            </Button>
          </div>
          <div className="marqueur" style={{ top: '6%', left: '76.5%' }}>
            <Button size="small" component={Link} to="/administration/appareil-detail/17">
              <MapMarkerIcon />
            </Button>
          </div>
          <div className="marqueur" style={{ top: '30%', left: '68.5%' }}>
            <Button size="small" component={Link} to="/administration/appareil-detail/17">
              <MapMarkerIcon />
            </Button>
          </div>
          <div className="marqueur" style={{ top: '35%', left: '68.5%' }}>
            <Button size="small" component={Link} to="/administration/appareil-detail/17">
              <MapMarkerIcon />
            </Button>
          </div>
          <div className="marqueur" style={{ top: '45%', left: '68.5%' }}>
            <Button size="small" component={Link} to="/administration/appareil-detail/17">
              <MapMarkerIcon />
            </Button>
          </div>
          <div className="marqueur" style={{ top: '80%', left: '67.5%' }}>
            <Button size="small" component={Link} to="/administration/appareil-detail/17">
              <MapMarkerIcon />
            </Button>
          </div>
          <div className="marqueur" style={{ top: '70%', left: '67.5%' }}>
            <Button size="small" component={Link} to="/administration/appareil-detail/17">
              <MapMarkerIcon />
            </Button>
          </div>

          {/* Add other markers here */}
        </div> 
      </ImageContainer>
      <div style={{ padding: '3%' }}>
        <Link to="/acceuil/default">
          <Button variant="contained" color="info" sx={{ padding: 2 }}>
            Retour à l'acceuil
          </Button>
        </Link>
      </div>
    </Container>
  </MainCard>
);

export default LaboratoireMicrobiologie;
