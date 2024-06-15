// Import your menu items
import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import administration from './Administration';
import acceuil from './acceuil';
import intervention from './demande_analyste';
import demande_technicien from './demande_technicien';
// Function to get user role from local storage

const getUserRole = () => {
  // setTimeout(() => {  console.log('easy boys'); }, 5000);
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(localStorage.getItem('user'));
  return user?.role || 'guest';
};

// Get the user role
const userRole = getUserRole();
// Conditionally add menu items based on user role
let menuItems = {
  items: [acceuil]
};

if (userRole === 'administrateur') {
  // menuItems.items = [acceuil, dashboard, pages, utilities, administration, other];
  menuItems.items = [acceuil,pages,other];
}else if (userRole === 'analyst'){
  menuItems.items = [acceuil, intervention,other];
}else if (userRole === 'Technicien') {
  menuItems.items = [acceuil, demande_technicien, intervention, other];
}

export default menuItems;

