import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'guards/AuthGuard'; // Import AuthGuard

const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const GestionEquipements = Loadable(lazy(() => import('views/administration/GestionEquipements')));
const GestionLaboratoires = Loadable(lazy(() => import('views/administration/GestionLaboratoires')));
const GestionUtilisateurs = Loadable(lazy(() => import('views/administration/GestionUtilisateurs')));
const Acceuil = Loadable(lazy(() => import('views/acceuil/Acceuil')));
const LaboratoireMicrobiologie = Loadable(lazy(() => import('views/laboratories/LaboratoireMicrobiologie')));
const LaboratoirePhysycoChimique = Loadable(lazy(() => import('views/laboratories/LaboratoirePhysycoChimique')));
const AddUser = Loadable(lazy(() => import('views/components/AddUser')));
const GestionMatrices = Loadable(lazy(() => import('views/administration/GestionMatrices')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const AppareilDetail = Loadable(lazy(() => import('views/administration/AppareilDetail')));
const Matrice = Loadable(lazy(() => import('views/components/Matrice')));
const DefinirDemande = Loadable(lazy(() => import('views/intervention/DefinirDemande')));
const DemandesAnalyste = Loadable(lazy(() => import('views/intervention/DemandesAnalyste')));
const DemandesTraitees = Loadable(lazy(() => import('views/intervention/DemandesTraitees')));
const DemandesTechnicien = Loadable(lazy(() => import('views/demandes/DemandesTechnicien')));
const DemandesTraitees_Tech = Loadable(lazy(() => import('views/demandes/DemandesTraitees_Tech')));
const GestionCategories = Loadable(lazy(() => import('views/administration/GestionCategories')));
const GestionUnite = Loadable(lazy(() => import('views/administration/GestionUnites')));
const Logout = Loadable(lazy(() => import('views/profile/Logout')));
const Profile = Loadable(lazy(()=>import('views/profile/Profile')));
const AffecterEmplacement = Loadable(lazy(() => import('views/administration/AffecterEmplacement')));
const SuiviEmplacement = Loadable(lazy(() => import('views/acceuil/SuiviEmplacement')));
const Emplacement = Loadable(lazy(() => import('views/acceuil/Emplacement')));
const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    { path: '/', element: <Acceuil /> },
    // { path: '/', element: <DashboardDefault /> },
    { path: 'acceuil', children: [{ path: 'default', element: <Acceuil /> }] },
    { path: 'acceuil', children: [{ path: 'emplacement', element: <SuiviEmplacement /> }] },
    { path: 'acceuil', children: [{ path: 'place', element: <Emplacement /> }] },
    { path: 'dashboard', children: [{ path: 'default', element: <DashboardDefault /> }] },
    { path: 'utils', children: [{ path: 'util-typography', element: <UtilsTypography /> }] },
    { path: 'utils', children: [{ path: 'util-color', element: <UtilsColor /> }] },
    { path: 'utils', children: [{ path: 'util-shadow', element: <UtilsShadow /> }] },
    { path: 'administration', children: [{ path: 'gestion-equipements', element: <GestionEquipements /> }] },
    { path: 'administration', children: [{ path: 'gestion-laboratoires', element: <GestionLaboratoires /> }] },
    { path: 'administration', children: [{ path: 'gestion-utilisateurs', element: <GestionUtilisateurs /> }] },
    { path: 'administration', children: [{ path: 'appareil-detail/:id', element: <AppareilDetail /> }] },
    { path: 'administration', children: [{ path: 'gestion-matrices', element: <GestionMatrices /> }] },
    { path: 'administration', children: [{ path: 'gestion-categories', element: <GestionCategories /> }] },
    { path: 'administration', children: [{ path: 'gestion-unite', element: <GestionUnite /> }] },
    { path: 'administration', children: [{ path: 'affecter-emplacement/:id', element: <AffecterEmplacement /> }] },
    {
      path: 'components',
      children: [
        { path: 'add-user', element: <AddUser /> },
        { path: 'matrice/:id', element: <Matrice /> }
      ]
    },
    {
      path: 'laboratoires',
      children: [
        { path: 'microbiologie', element: <LaboratoireMicrobiologie /> },
        { path: 'physyco-chimique', element: <LaboratoirePhysycoChimique /> }
      ]
    },
    { path: '/profile/profile', element: <Profile /> },
    { path: '/profile/logout', element: <Logout /> },
    {
      path: 'intervention',
      children: [
        { path: '/intervention/definir-demande', element: <DefinirDemande /> },
        { path: '/intervention/demandes-analyste', element: <DemandesAnalyste /> },
        { path: '/intervention/demandes-analyste-traitees', element: <DemandesTraitees /> }
      ]
    },
    {
      path: 'demandes',
      children: [
        { path: '/demandes/demandes-technicien', element: <DemandesTechnicien /> },
        { path: '/demandes/demandes-technicien-traitees', element: <DemandesTraitees_Tech /> }
      ]
    }
  ]
};

export default MainRoutes;
