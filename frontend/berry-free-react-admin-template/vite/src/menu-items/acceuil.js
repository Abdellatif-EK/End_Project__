// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';
import MapMarkerIcon from '@mui/icons-material/Room';
// constant
const icons = { IconBrandChrome, IconHelp, MapMarkerIcon };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const acceuil = {
  id: 'acceuil',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Acceuil',
      type: 'item',
      url: '/acceuil/default',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'emplacement',
      title: 'Suivi Emplacement',
      type: 'item',
      url: '/acceuil/emplacement',
      icon: icons.MapMarkerIcon,
      breadcrumbs: false
    }
  ]
};

export default acceuil;
