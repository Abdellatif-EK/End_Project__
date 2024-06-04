import EquipmentList from './EquipementList';
import UserList from './UserList';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import MainCard from 'ui-component/cards/MainCard';
import SendIcon from '@mui/icons-material/Send';
import { MuiFileInput } from 'mui-file-input';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';

function GestionMatrices() {
  const [Equipements, setEquipements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // const equipementsResponse = await
    axios
      .get('http://127.0.0.1:8000/Equipement')
      .then((res) => setEquipements(res.data))
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <MainCard style={{backgroundColor: "#F2F2F2"}}>
      {/* <Box sx={{ width: '100%' }}>
            <Typography variant="h1" gutterBottom>
                    Gestion des Matrices
            </Typography>
            <TextField
                label="Recherche des équipements"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                sx={{ marginRight: 2 }}
                />

        </Box>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Toolbar>
            <Typography>

            </Typography>
          </Toolbar>


          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell>
                      <TableCell align="center">Code Machine</TableCell>
                      <TableCell align="center">Model</TableCell>
                      <TableCell align="center">Etat</TableCell>
                      <TableCell align="center">Actions</TableCell>
                  </TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
              {Equipements.map((equipement, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow>
                    <TableCell>
                      {equipement.Code_machine}
                    </TableCell>

                    <TableCell>
                      {equipement.modele}
                    </TableCell>

                    <TableCell>
                      {equipement.Etat}
                    </TableCell>

                    <TableCell>
                        <Button size="small" component={Link} to={`/components/matrice/${equipement.id}`}>
                          Voir la matrices d'acces
                        </Button>
                    </TableCell>
                  </TableRow>
                );
                })}
               </TableBody>                      
            
                          
            </Table>
          </TableContainer>

        </Paper> */}
      <Box sx={{ width: '100%' }}>
            <Typography variant="h1" gutterBottom>
                    Gestion des Matrices
            </Typography>
            <TextField
                label="Recherche des équipements"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                sx={{ marginRight: 2 }}
                />

        </Box>
      <Grid container spacing={5} style={{ marginTop: '20px' }}>
        {Equipements.map((equipement, index) => {
          const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <Grid item xs={12} sm={4} ms={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia component="img" height="140" image={`http://127.0.0.1:8000${equipement.image}`} alt="green iguana" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {equipement.Appareil}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {equipement.modele}
                    </Typography>
                    <Typography>{equipement.Etat}</Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button size="small" color="primary" component={Link} to={`/components/matrice/${equipement.id}`}>
                    Matrice d'acces
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </MainCard>
  );
}

export default GestionMatrices;
