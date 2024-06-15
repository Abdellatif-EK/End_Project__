// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import EngineeringIcon from '@mui/icons-material/Engineering';
// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  EngineeringIcon
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
      icon: icons.EngineeringIcon,
      breadcrumbs: false
    },
    {
      id: 'demandes_analyste_traitees',
      title: 'Liste des Demandes Traitées',
      type: 'item',
      url: '/demandes/demandes-technicien-traitees',
      icon: icons.EngineeringIcon,
      breadcrumbs: false
    }
  ]
};

export default intervention;
