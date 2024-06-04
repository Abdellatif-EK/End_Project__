import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));
// const Admin_gestion_equipements = Loadable(lazy(() => import('views/pages/administration/gestion_equipements')));
// const Admin_gestion_laboratoires = Loadable(lazy(() => import('views/pages/administration/gestion_laboratoires')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login/login3',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    },
    // {
    //   path: '/pages/gestion_equipements',
    //   element: <GestionEquipements />
    // },
    // {
    //   path: '/pages/gestion_laboratoires',
    //   element: <GestionLaboratoires />
    // }
  ]
};

export default AuthenticationRoutes;
