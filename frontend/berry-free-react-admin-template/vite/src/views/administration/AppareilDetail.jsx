import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!equipement) {
    return (
      <div className="container mt-4">
        <h5>Equipement not found</h5>
      </div>
    );
  }

  return (
    <MainCard>
    <div className="container mt-4">
      <h1 style={{ paddingLeft: '5%' }}>Pharma 5 Smart Factory</h1>
      <div className="container-1">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <h3 className="para">Voilà l'équipement dont nous disposons</h3>
            <p style={{ fontSize: '15px' }}>L'emplacement : <strong>{equipement.Emplacement}</strong></p>
            {equipement.image && (
              <a href={`http://127.0.0.1:8000${equipement.image}`}>
                <img
                  src={`http://127.0.0.1:8000${equipement.image}`}
                  alt={equipement.Appareil}
                  style={{ width: '400px', height: '400px', paddingLeft: '8%', paddingBottom: '5px' }}
                />
              </a>
            )}
          </div>
          <div className="col" style={{ fontSize: '13px' }}>
            <ul>
              <li>Appareil : <strong>{equipement.Appareil}</strong></li>
              <li>Code machine : <strong>{equipement.Code_machine}</strong></li>
              <li>Modèle : <strong>{equipement.modele}</strong></li>
              <li>Situation : <strong>{equipement.Situation}</strong></li>
              <li>Numéro de série : <strong>{equipement.numero_serie}</strong></li>
              <li>Fournisseur : <strong>{equipement.Fournisseur}</strong></li>
              <li>Etat : <strong>{equipement.Etat}</strong></li>
              <li>Logiciel : <strong>{equipement.Logiciel}</strong></li>
              <li>Version du logiciel : <strong>{equipement.version_logiciel}</strong></li>
              <li>Password : <strong>{equipement.Password}</strong></li>
              <li>Matrice d'accès : <strong>{equipement.matrice_acces}</strong></li>
              <li>Version Windows : <strong>{equipement.Version_windows}</strong></li>
              <li>Etat du matériel informatique : <strong>{equipement.Etat_materiel_informatique}</strong></li>
              <li>Sauvegarde : <strong>{equipement.Sauvegarde}</strong></li>
              <li>Planning de Sauvegarde : <strong>{equipement.planning_sauvegarde}</strong></li>
              <li>Documentation qualification : <strong>{equipement.DOC_qualification}</strong></li>
              <li>Connexion au réseau : <strong>{equipement.Connecte_reseau}</strong></li>
              <li>Connexion à : <strong>{equipement.Connexion_a}</strong></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-1">
        <p>Les images</p>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {equipement.additional_images && equipement.additional_images.map((image, index) => (
            <div className="col" key={index}>
              <a href={`http://127.0.0.1:8000${image.url}`}>
                <img
                  src={`http://127.0.0.1:8000${image.url}`}
                  alt={`Image ${index}`}
                  style={{ width: '400px', height: '400px', paddingBottom: '5px' }}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
    </MainCard>
  );
};

export default AppareilDetail;
