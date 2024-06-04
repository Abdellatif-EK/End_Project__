// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    // {
    //   id: 'authentication',
    //   title: 'Authentication',
    //   type: 'collapse',
    //   icon: icons.IconKey,

    //   children: [
    //     {
    //       id: 'login3',
    //       title: 'Login',
    //       type: 'item',
    //       url: '/pages/login/login3',
    //       target: true
    //     },
    //     {
    //       id: 'register3',
    //       title: 'Register',
    //       type: 'item',
    //       url: '/pages/register/register3',
    //       target: true
    //     }
    //   ]
    // },
    {
      id: 'administration',
      title: 'Administration',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'gestion_equipements',
          title: 'gestion des équipements',
          type: 'item',
          url: '/administration/gestion-equipements',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'gestion_laboratoires',
          title: 'gestion des laboratoires',
          type: 'item',
          url: '/administration/gestion-laboratoires',
          icon: icons.IconPalette,
          breadcrumbs: false
        },
        {
            id: 'gestion_utilisateurs',
            title: 'gestion des utilisateurs',
            type: 'item',
            url: '/administration/gestion-utilisateurs',
            icon: icons.IconPalette,
            breadcrumbs: false
        },
        {
            id: 'gestion_matrices',
            title: 'gestion des matrices',
            type: 'item',
            url: '/administration/gestion-matrices',
            icon: icons.IconPalette,
            breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;
