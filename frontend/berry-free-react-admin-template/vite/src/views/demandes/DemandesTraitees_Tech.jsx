import { Box, Tab, TableContainer, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState, useEffect } from "react";
import axios from 'axios';
import MainCard from "ui-component/cards/MainCard";
import {Table,TableHead,TableRow,TableCell,Paper,TableBody} from "@mui/material";

const DemandesTraitees_Tech = () => {
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [openTerminer, setOpenTerminer] = useState(false);
  const [openVerifier, setOpenVerifier] = useState(false); // Corrected from userState to useState
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [actionType, setActionType] = useState("");
  const [comment, setComment] = useState("");
  const [demandes_en_attente, setDemandes_en_attente] = useState([]);
  const [demandes_en_cours, setDemandes_en_cours] = useState([]);
  const [demandes_non_faisable,setDemandes_non_faisable] = useState([]);
  const [demandes_traite,setDemandes_traite]=useState([]);
  const [demandes_verifie,setDemandes_verifie]=useState([]);

  useEffect(() => {
    fetchDemandes_en_attente();
    fetchDemandes_en_cours();
    fetchDemandes_non_faisable();
    fetchDemandes_traite();
    fetchDemandes_verfie();
  }, []);

  const fetchDemandes_en_attente = async () => {
    try {
      //console log the id of the user stored in the localStorage
      
      // console.log(localStorage.getItem('user'));
      const response = await axios.get('http://localhost:8000/demande/en-attente');
      const demandesData = await Promise.all(response.data.map(async (demande) => {
        const equipementResponse = await axios.get(`http://localhost:8000/Equipement/${demande.equipement}`);
        const employeResponse = await axios.get(`http://localhost:8000/Employe/${demande.analyste}`);
        return {
          ...demande,
          equipement: equipementResponse.data.Code_machine,
          analyste: employeResponse.data.username
        };
      }));
      setDemandes_en_attente(demandesData);
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };

  const fetchDemandes_en_cours = async () => {
    try {
      const response = await axios.get('http://localhost:8000/demande/en-cours');
      const demandesData = await Promise.all(
        response.data.map(async (demande) => {
          const equipementResponse = await axios.get(`http://localhost:8000/Equipement/${demande.equipement}`);
          const AnalysteResponse = await axios.get(`http://localhost:8000/Employe/${demande.analyste}`);
          const TechnicienResponse = await axios.get(`http://localhost:8000/Employe/${demande.technicien}`);
          return {
            ...demande,
            equipement: equipementResponse.data.Code_machine,
            analyste: AnalysteResponse.data.username,
            technicien: TechnicienResponse.data.username
          };
        })
      );
      setDemandes_en_cours(demandesData);
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };

  const fetchDemandes_non_faisable = async () => {
    try {
      const response = await axios.get('http://localhost:8000/demande/non-faisable');
      const demandesData = await Promise.all(
        response.data.map(async (demande) => {
          const equipementResponse = await axios.get(`http://localhost:8000/Equipement/${demande.equipement}`);
          const AnalysteResponse = await axios.get(`http://localhost:8000/Employe/${demande.analyste}`);
          const TechnicienResponse = await axios.get(`http://localhost:8000/Employe/${demande.technicien}`);
          return {
            ...demande,
            equipement: equipementResponse.data.Code_machine,
            analyste: AnalysteResponse.data.username,
            technicien: TechnicienResponse.data.username
          };
        })
      );
      setDemandes_non_faisable(demandesData);
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };

  const fetchDemandes_traite = async () => {
    try {
      const response = await axios.get('http://localhost:8000/demande/traitee');
      const demandesData = await Promise.all(
        response.data.map(async (demande) => {
          const equipementResponse = await axios.get(`http://localhost:8000/Equipement/${demande.equipement}`);
          const AnalysteResponse = await axios.get(`http://localhost:8000/Employe/${demande.analyste}`);
          const TechnicienResponse = await axios.get(`http://localhost:8000/Employe/${demande.technicien}`);
          return {
            ...demande,
            equipement: equipementResponse.data.Code_machine,
            analyste: AnalysteResponse.data.username,
            technicien: TechnicienResponse.data.username
          };
        })
      );
      setDemandes_traite(demandesData);
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };

  const fetchDemandes_verfie = async () => {
    try {
      const response = await axios.get('http://localhost:8000/demande/verifie');
      const demandesData = await Promise.all(
        response.data.map(async (demande) => {
          const equipementResponse = await axios.get(`http://localhost:8000/Equipement/${demande.equipement}`);
          const AnalysteResponse = await axios.get(`http://localhost:8000/Employe/${demande.analyste}`);
          const TechnicienResponse = await axios.get(`http://localhost:8000/Employe/${demande.technicien}`);
          const VerifiantResponse = await axios.get(`http://localhost:8000/Employe/${demande.verifiant}`);
          return {
            ...demande,
            equipement: equipementResponse.data.Code_machine,
            analyste: AnalysteResponse.data.username,
            technicien: TechnicienResponse.data.username,
            verifiant: VerifiantResponse.data.username
          };
        })
      );
      setDemandes_verifie(demandesData);
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };

  const handleClickOpen_Verifier = (demande,type)=>{
    setSelectedDemande(demande);
    setActionType(type);
    setOpenVerifier(true);
  }


  const handleClickOpen = (demande, type) => {
    setSelectedDemande(demande);
    setActionType(type);
    setOpen(true);
  };

  const handleClickOpenTerminer = (demande) => {
    setSelectedDemande(demande);
    setOpenTerminer(true);
  };



  const handleClose = () => {
    setOpen(false);
    setOpenTerminer(false);
    setOpenVerifier(false);
    setSelectedDemande(null);
    setActionType("");
    setComment("");
  };


  const handleConfirm_Verifier = async () => {
    if (selectedDemande) {
      try {
        const updatedEtat = actionType === 'valide' ? 'verifie' : 'invalide';
        console.log(updatedEtat);
        const user = JSON.parse(localStorage.getItem('user'));
        await axios.put(`http://localhost:8000/demande/analyste/update/${selectedDemande.id}/`, {
          etat: updatedEtat,
          verifiant: user.id
        });
        fetchDemandes_en_attente(); // Refresh the demandes after updating
        fetchDemandes_en_cours();
        fetchDemandes_traite();
        handleClose();
      } catch (error) {
        console.error('Error updating demande:', error);
      }
    }
  };


  const handleConfirm = async () => {
    if (selectedDemande) {
      try {
        const updatedEtat = actionType === "commencer" ? "en_cours" : "non_faisable";
        const today = new Date(); 
        const user = JSON.parse(localStorage.getItem('user'));
        const current_date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        await axios.put(`http://localhost:8000/demande/analyste/update/${selectedDemande.id}/`, {
          etat: updatedEtat,
          date_debut: current_date,
          technicien: user.id
        });
        fetchDemandes_en_attente(); // Refresh the demandes after updating
        fetchDemandes_en_cours();
        fetchDemandes_traite();
        fetchDemandes_non_faisable();
        handleClose();
      } catch (error) {
        console.error('Error updating demande:', error);
      }
    }
  };

  const handleTerminerTraitement = async () => {
    const today = new Date(); 
    const current_date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    if (selectedDemande && comment) {
      try {
        await axios.put(`http://localhost:8000/demande/analyste/update/${selectedDemande.id}/`, {
          etat: 'traite',
          action: comment,
          date_fin: current_date
        });
        fetchDemandes_en_cours(); // Refresh the demandes after updating
        fetchDemandes_traite();
        handleClose();
      } catch (error) {
        console.error('Error updating demande:', error);
      }
    }
  };
  const handlePrint = (demandeId) => {
    const url = `http://localhost:8000/demande/${demandeId}/pdf/`;
    window.location.href = url;
  };
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
              <Tab value="3" label="Demandes Non Faisables" />
              <Tab value="4" label="Demandes traitées" />
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
                      <TableCell align="center">Analyste</TableCell>
                      <TableCell align="center">Equipement</TableCell>
                      <TableCell align="center">Date de la demande</TableCell>
                      <TableCell align="center">Problème</TableCell>
                      <TableCell align="center">Etat</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {demandes_en_attente.map((demande) => (
                      <TableRow key={demande.id}>
                        <TableCell align="center">{demande.analyste}</TableCell>
                        <TableCell align="center">{demande.equipement}</TableCell>
                        <TableCell align="center">{new Date(demande.date_demande).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{demande.description}</TableCell>
                        <TableCell align="center">{demande.etat}</TableCell>
                        <TableCell align="center">
                          <Button variant="contained" color="primary" onClick={() => handleClickOpen(demande, 'commencer')} sx={{ mr: 5 }}>
                            Commencer
                          </Button>
                          <Button variant="contained" color="primary" onClick={() => handleClickOpen(demande, 'non_faisable')}>
                            Non Faisable
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
            <Paper sx={{ width: '100%', mb: 2 }}>
              <Typography variant="h4">Demandes en cours</Typography>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Analyste</TableCell>
                      <TableCell align="center">Equipement</TableCell>
                      <TableCell align="center">Date de la demande</TableCell>
                      <TableCell align="center">Technicien</TableCell>
                      <TableCell align="center">Problème</TableCell>
                      <TableCell align="center">Date Debut</TableCell>
                      <TableCell align="center">Etat</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {demandes_en_cours.map((demande) => (
                      <TableRow key={demande.id}>
                        <TableCell align="center">{demande.analyste}</TableCell>
                        <TableCell align="center">{demande.equipement}</TableCell>
                        <TableCell align="center">{new Date(demande.date_demande).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{demande.technicien}</TableCell>
                        <TableCell align="center">{demande.description}</TableCell>
                        <TableCell align="center">{new Date(demande.date_debut).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{demande.etat}</TableCell>
                        <TableCell align="center">
                          <Button variant="contained" color="primary" onClick={() => handleClickOpenTerminer(demande)}>
                            Terminer Traitement
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </TabPanel>

          <TabPanel value="3">
            <Typography variant="h4">Demandes Non Faisables</Typography>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Analyste</TableCell>
                      <TableCell align="center">Equipement</TableCell>
                      <TableCell align="center">Date de la demande</TableCell>
                      <TableCell align="center">Problème</TableCell>
                      <TableCell align="center">Etat</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {demandes_non_faisable.map((demande) => (
                      <TableRow key={demande.id}>
                        <TableCell align="center">{demande.analyste}</TableCell>
                        <TableCell align="center">{demande.equipement}</TableCell>
                        <TableCell align="center">{new Date(demande.date_demande).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{demande.description}</TableCell>
                        <TableCell align="center">{demande.etat}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </TabPanel>

          <TabPanel value="4">
            <Paper sx={{ width: '100%', mb: 2 }}>
              <Typography variant="h4">Demandes traitées</Typography>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Analyste</TableCell>
                      <TableCell align="center">Equipement</TableCell>
                      <TableCell align="center">Date de la demande</TableCell>
                      <TableCell align="center">Technicien</TableCell>
                      <TableCell align="center">Problème</TableCell>
                      <TableCell align="center">Date Debut</TableCell>
                      <TableCell align="center">Date Fin</TableCell>
                      <TableCell align="center">Etat</TableCell>
                      <TableCell align="center">Commentaire</TableCell>
                      {JSON.parse(localStorage.getItem('user')).role === 'analyst' && <TableCell align="center">Action Spéciale</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {demandes_traite.map((demande) => (
                      <TableRow key={demande.id}>
                        <TableCell align="center">{demande.analyste}</TableCell>
                        <TableCell align="center">{demande.equipement}</TableCell>
                        <TableCell align="center">{new Date(demande.date_demande).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{demande.technicien}</TableCell>
                        <TableCell align="center">{demande.description}</TableCell>
                        <TableCell align="center">{new Date(demande.date_debut).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{new Date(demande.date_fin).toLocaleDateString()}</TableCell>

                        <TableCell align="center">{demande.etat}</TableCell>

                        {JSON.parse(localStorage.getItem('user')).role === 'analyst' && (
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleClickOpen_Verifier(demande, 'valide')}
                              sx={{ mr: 5 }}
                            >
                              Valide
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => handleClickOpen_Verifier(demande, 'invalide')}>
                              Invalide
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </TabPanel>

          <TabPanel value="5">
            <Paper sx={{ width: '100%', mb: 2 }}>
              <Typography variant="h4">Demandes Vérifiées</Typography>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Analyste</TableCell>
                      <TableCell align="center">Equipement</TableCell>
                      <TableCell align="center">Date de la demande</TableCell>
                      <TableCell align="center">Technicien</TableCell>
                      <TableCell align="center">Problème</TableCell>
                      <TableCell align="center">Date Debut</TableCell>
                      <TableCell align="center">Date Fin</TableCell>
                      <TableCell align="center">Verifie Par</TableCell>
                      <TableCell align="center">Etat</TableCell>
                      <TableCell align="center">Imprimer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {demandes_verifie.map((demande) => (
                      <TableRow key={demande.id}>
                        <TableCell align="center">{demande.analyste}</TableCell>
                        <TableCell align="center">{demande.equipement}</TableCell>
                        <TableCell align="center">{new Date(demande.date_demande).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{demande.technicien}</TableCell>
                        <TableCell align="center">{demande.description}</TableCell>
                        <TableCell align="center">{new Date(demande.date_debut).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{new Date(demande.date_fin).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{demande.verifiant}</TableCell>
                        <TableCell align="center">{demande.etat}</TableCell>
                        <TableCell align="center">
                          <Button variant="contained" color="primary" onClick={() => handlePrint(demande.id)}>
                            Imprimer
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </TabPanel>
        </TabContext>
      </Box>

      <Dialog open={openVerifier} onClose={handleClose}>
        <DialogTitle>Confirmer l'action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir {actionType === 'valide' ? 'valider la traitement de ' : 'invalider la traitement de'} cette demande?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirm_Verifier} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmer l'action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir {actionType === 'commencer' ? 'commencer le traitement de' : 'marquer comme non faisable'} cette
            demande?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTerminer} onClose={handleClose}>
        <DialogTitle>Terminer le traitement de la demande</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="action"
            label="Action/Commentaire"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleTerminerTraitement} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default DemandesTraitees_Tech;