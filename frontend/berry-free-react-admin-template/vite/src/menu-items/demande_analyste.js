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

const intervention = {
  id: 'intervention',
  title: 'Interventions',
  type: 'group',
  children: [
    {
      id: 'definir_demande',
      title: 'Definir Demande Intervention',
      type: 'item',
      url: '/intervention/definir-demande',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'demandes_analyste',
      title: 'Liste des Demandes',
      type: 'item',
      url: '/intervention/demandes-analyste',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'demandes_analyste_traitees',
      title: 'Liste des Demandes Traitées',
      type: 'item',
      url: '/intervention/demandes-analyste-traitees',
      icon: icons.IconTypography,
      breadcrumbs: false
    }
  ]
};

export default intervention;
