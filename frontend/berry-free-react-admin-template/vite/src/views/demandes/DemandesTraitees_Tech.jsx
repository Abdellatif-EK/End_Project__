import { Box, Tab, TableContainer, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import React from "react";
import MainCard from "ui-component/cards/MainCard";
import {Table,TableHead,TableRow,TableCell,Paper,TableBody} from "@mui/material";
import { useEffect } from "react";
const DemandesTraitees_Tech = () => {
  const [value, setValue] = useState("1");
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/demande/en-attente');
        setDemandes(response.data);
      } catch (error) {
        console.error('Error fetching demandes:', error);
      }
    };

    fetchDemandes();
  }, []);

  return (
    <MainCard>
      <Box>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              aria-label="secondary tabs example"
              textColor="secondary"
              indicatorColor="secondary"
              onChange={(e, newValue) => setValue(newValue)}
              centered
            >
              <Tab value="1" label="Demandes en attente" />
              <Tab value="2" label="Demandes en cours" />
              <Tab value="3" label="Demandes traitées" />
              <Tab value="4" label="Demandes Non Faisables" />
              <Tab value="5" label="Demandes Vérifiées" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Paper sx={{ width: '100%', mb: 2 }}>
              <Typography variant="h4">Demandes en attente</Typography>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                  <TableHead>
                    <TableRow>
                      <TableCell key="Analyste" align="center" padding="normal">
                        Analyste
                      </TableCell>
                      <TableCell key="Equipement" align="center" padding="normal">
                        Equipement
                      </TableCell>
                      <TableCell key="Date_Demande" align="center" padding="normal">
                        Date de la demande
                      </TableCell>
                      <TableCell key="Description" align="center" padding="normal">
                        Description
                      </TableCell>
                      <TableCell key="Etat" align="center" padding="normal">
                        Etat
                      </TableCell>
                      <TableCell key="Action" align="center" padding="normal">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {demandes.map((demande) => (
                        <TableRow key={demande.id}>
                          <TableCell align="center">{demande.analyste.username}</TableCell>
                          <TableCell align="center">{demande.equipement.appareil}</TableCell>
                          <TableCell align="center">{new Date(demande.date_demande).toLocaleDateString()}</TableCell>
                          <TableCell align="center">{demande.description}</TableCell>
                          <TableCell align="center">{demande.etat}</TableCell>
                          <TableCell align="center">
                            <Button variant="contained" color="primary">
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </TabPanel>

          <TabPanel value="2">
            <Typography variant="h4">Demandes en cours</Typography>
          </TabPanel>

          <TabPanel value="3">
            <Typography variant="h4">Demandes traitées</Typography>
          </TabPanel>

          <TabPanel value="4">
            <Typography variant="h4">Demandes Non Faisables</Typography>
          </TabPanel>

          <TabPanel value="5">
            <Typography variant="h4">Demandes Vérifiées</Typography>
          </TabPanel>
        </TabContext>
      </Box>
    </MainCard>
  );
};

export default DemandesTraitees_Tech;