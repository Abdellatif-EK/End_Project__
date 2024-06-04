// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

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
    }
  ]
};

export default acceuil;
