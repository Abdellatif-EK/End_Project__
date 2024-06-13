// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// constant
const icons = { AccountCircleIcon,LogoutIcon,IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    // {
    //   id: 'sample-page',
    //   title: 'Profile',
    //   type: 'item',
    //   url: '/sample-page',
    //   icon: icons.AccountCircleIcon,
    //   breadcrumbs: false
    // },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/profile/profile',
      icon: icons.AccountCircleIcon,
      breadcrumbs: false
    },
    {
      id: 'logout',
      title: 'Déconnexion',
      type: 'item',
      url: '/profile/logout',
      icon: icons.LogoutIcon,
      breadcrumbs: false
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
