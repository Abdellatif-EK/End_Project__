import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Alert } from '@mui/material';
import { styled } from '@mui/system';
import MapMarkerIcon from '@mui/icons-material/Room';
import { useSelector } from 'react-redux';
import CartLaboImage from './Cart_labo2.jpg';

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

const LaboratoirePhysycoChimique = () => {
//   const user = useSelector((state) => state.user);

//   if (!user.isAuthenticated) {
//     return (
//       <Container>
//         <Alert severity="error">
//           Désolé, vous n'êtes pas connecté!
//           <Link to="/connexion"> Connectez-vous!</Link>
//         </Alert>
//       </Container>
//     );
//   }

  return (
    <Container>
      <Typography variant="h4" sx={{ paddingLeft: 2 }}>
        Pharma 5 Smart Factory
      </Typography>
      <Typography variant="body1" className="para">
        La Cartographie du laboratoire <strong>Physico-chimique</strong> avec l'emplacement des différents équipements qui y sont utilisés
      </Typography>
      <ImageContainer>
        <img id="image-marqueurs" src={CartLaboImage} alt="Description de l'image" className="cart" />
        <div className="HPLC">
          <div className="marqueur" style={{ top: '5%', left: '8.5%' }}>
            <Link to="/appareil-detail/10">
              <MapMarkerIcon />
            </Link>
          </div>
          <div className="marqueur" style={{ top: '5%', left: '15%' }}>
            <Link to="/appareil-detail/9">
              <MapMarkerIcon />
            </Link>
          </div>
          <div className="marqueur" style={{ top: '18%', left: '26%' }}>
            <Link to="/appareil-detail/3">
              <MapMarkerIcon />
            </Link>
          </div>
        </div>
        <div className="Spectropho">
          <div className="marqueur" style={{ top: '10%', left: '45%' }}>
            <Link to="/appareil-detail/5">
              <MapMarkerIcon />
            </Link>
          </div>
          <div className="marqueur" style={{ top: '10%', left: '50%' }}>
            <Link to="/appareil-detail/6">
              <MapMarkerIcon />
            </Link>
          </div>
        </div>
        <div className="Imprimante">
          <div className="marqueur" style={{ top: '15%', left: '65%' }}>
            <Link to="/appareil-detail/8">
              <MapMarkerIcon />
            </Link>
          </div>
        </div>
        <div className="Balance">
          <div className="marqueur" style={{ top: '50%', left: '30%' }}>
            <Link to="/appareil-detail/11">
              <MapMarkerIcon />
            </Link>
          </div>
          <div className="marqueur" style={{ top: '55%', left: '30%' }}>
            <Link to="/appareil-detail/12">
              <MapMarkerIcon />
            </Link>
          </div>
        </div>
        <div className="pHMetre">
          <div className="marqueur" style={{ top: '75%', left: '35%' }}>
            <Link to="/appareil-detail/14">
              <MapMarkerIcon />
            </Link>
          </div>
          <div className="marqueur" style={{ top: '75%', left: '40%' }}>
            <Link to="/appareil-detail/15">
              <MapMarkerIcon />
            </Link>
          </div>
        </div>
        <div className="KarlFischer">
          <div className="marqueur" style={{ top: '65%', left: '60%' }}>
            <Link to="/appareil-detail/16">
              <MapMarkerIcon />
            </Link>
          </div>
          <div className="marqueur" style={{ top: '65%', left: '65%' }}>
            <Link to="/appareil-detail/17">
              <MapMarkerIcon />
            </Link>
          </div>
        </div>
        <div className="Autre">
          <div className="marqueur" style={{ top: '85%', left: '20%' }}>
            <Link to="/appareil-detail/18">
              <MapMarkerIcon />
            </Link>
          </div>
          <div className="marqueur" style={{ top: '85%', left: '25%' }}>
            <Link to="/appareil-detail/19">
              <MapMarkerIcon />
            </Link>
          </div>
          <div className="marqueur" style={{ top: '85%', left: '30%' }}>
            <Link to="/appareil-detail/20">
              <MapMarkerIcon />
            </Link>
          </div>
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
  );
};

export default LaboratoirePhysycoChimique;
