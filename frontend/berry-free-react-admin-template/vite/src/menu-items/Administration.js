// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const administration = {
  id: 'administration',
  title: 'Administration',
  type: 'group',
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
        title: 'Matrices d\'accés',
        type: 'item',
        url: '/administration/gestion-matrices',
        icon: icons.IconPalette,
        breadcrumbs: false
    }
  ]
};

export default administration;
