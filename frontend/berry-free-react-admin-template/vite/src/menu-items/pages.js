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
          title: 'Equipements',
          type: 'item',
          url: '/administration/gestion-equipements',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'gestion_categories',
          title: 'Catégories',
          type: 'item',
          url: '/administration/gestion-categories',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'gestion_laboratoires',
          title: 'Laboratoires',
          type: 'item',
          url: '/administration/gestion-laboratoires',
          icon: icons.IconPalette,
          breadcrumbs: false
        },
        {
          id: 'gestion_utilisateurs',
          title: 'Utilisateurs',
          type: 'item',
          url: '/administration/gestion-utilisateurs',
          icon: icons.IconPalette,
          breadcrumbs: false
        },
        {
          id: 'gestion_matrices',
          title: "Matrices d'accés",
          type: 'item',
          url: '/administration/gestion-matrices',
          icon: icons.IconPalette,
          breadcrumbs: false
        },
        {
          id: 'gestion_unite',
          title: "Unités",
          type: 'item',
          url: '/administration/gestion-unite',
          icon: icons.IconPalette,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;
