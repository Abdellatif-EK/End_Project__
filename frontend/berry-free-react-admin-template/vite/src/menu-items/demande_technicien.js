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
  id: 'demandes',
  title: 'Interventions',
  type: 'group',
  children: [
    {
      id: 'demandes_technicien',
      title: 'Liste des Demandes',
      type: 'item',
      url: '/demandes/demandes-technicien',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'demandes_analyste_traitees',
      title: 'Liste des Demandes Traitées',
      type: 'item',
      url: '/demandes/demandes-technicien-traitees',
      icon: icons.IconTypography,
      breadcrumbs: false
    }
  ]
};

export default intervention;
