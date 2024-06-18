import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Grid, Container, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const AppareilDetail = () => {
  const { id } = useParams();
  const [equipement, setequipement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/Equipement/${id}`)
      .then((response) => {
        setequipement(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the equipement details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!equipement) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Equipement not found</Typography>
      </Container>
    );
  }

  return (
    <MainCard>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom>Pharma 5 Smart Factory</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Voilà l'équipement dont nous disposons</Typography>
                <Typography variant="body1">L'emplacement : <strong>Laboratoire de controle</strong></Typography>
                {equipement.image && (
                  <CardMedia
                    component="img"
                    image={`http://127.0.0.1:8000${equipement.image}`}
                    alt={equipement.Appareil}
                    sx={{ width: '100%', height: 'auto', mt: 2 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Details</Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li">Appareil : <strong>{equipement.Appareil}</strong></Typography>
                  <Typography component="li">Code machine : <strong>{equipement.Code_machine}</strong></Typography>
                  <Typography component="li">Modèle : <strong>{equipement.modele}</strong></Typography>
                  <Typography component="li">Situation : <strong>{equipement.Situation}</strong></Typography>
                  <Typography component="li">Numéro de série : <strong>{equipement.numero_serie}</strong></Typography>
                  <Typography component="li">Fournisseur : <strong>{equipement.Fournisseur}</strong></Typography>
                  <Typography component="li">Etat : <strong>{equipement.Etat}</strong></Typography>
                  <Typography component="li">Logiciel : <strong>{equipement.Logiciel}</strong></Typography>
                  <Typography component="li">Version du logiciel : <strong>{equipement.version_logiciel}</strong></Typography>
                  <Typography component="li">Password : <strong>{equipement.Password}</strong></Typography>
                  <Typography component="li">Matrice d'accès : <strong>{equipement.matrice_acces}</strong></Typography>
                  <Typography component="li">Version Windows : <strong>{equipement.Version_windows}</strong></Typography>
                  <Typography component="li">Etat du matériel informatique : <strong>{equipement.Etat_materiel_informatique}</strong></Typography>
                  <Typography component="li">Sauvegarde : <strong>{equipement.Sauvegarde}</strong></Typography>
                  <Typography component="li">Planning de Sauvegarde : <strong>{equipement.planning_sauvegarde}</strong></Typography>
                  <Typography component="li">Documentation qualification : <strong>{equipement.DOC_qualification}</strong></Typography>
                  <Typography component="li">Connexion au réseau : <strong>{equipement.Connecte_reseau}</strong></Typography>
                  <Typography component="li">Connexion à : <strong>{equipement.Connexion_a}</strong></Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          {/* <Typography variant="h6" gutterBottom>Les images</Typography> */}
          <Grid container spacing={4}>
            {equipement.additional_images && equipement.additional_images.map((image, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={`http://127.0.0.1:8000${image.url}`}
                    alt={`Image ${index}`}
                    sx={{ width: '100%', height: 'auto' }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </MainCard>
  );
};

export default AppareilDetail;

