// project imports
import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Typography, Button, Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import video from 'videos/3Dlabo2.mp4';




const Acceuil = () => (
  <Container>
    <Typography variant="h2" gutterBottom>
      Pharma 5 Smart Factory
    </Typography>
    <Typography variant="h4" gutterBottom>
      Soyez les bienvenus sur notre site!
    </Typography>
    <Grid container spacing={4} style={{ height: 500 }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardMedia
            component="iframe"
            src="https://www.youtube.com/embed/AZvV9yzKfOg"
            height="300"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <CardContent>
            <Typography variant="h5" component={Link} to="/laboratoires/microbiologie">
              Laboratoire Microbiologie
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Environnement hautement spécialisé et contrôlé, conçu pour mener des études et des analyses approfondies sur les micro-organismes.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to="/laboratoires/microbiologie">Voir la carte</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
            <CardMedia
              component="video"
              src={video}
              height="300"
              controls
            />
          <CardContent>
            <Typography variant="h5" component={Link} to="/laboratoires/physyco-chimique">
              Laboratoire Physyco-chimique
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Entité spécialisée dans l'analyse et l'évaluation des produits pharmaceutiques afin de garantir leur qualité, leur sécurité et leur conformité aux normes réglementaires.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to="/laboratoires/physyco-chimique">Voir la carte</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </Container>
);

export default Acceuil;
