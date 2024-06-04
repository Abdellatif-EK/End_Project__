import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import config from 'config';
// import Logo from 'ui-component/Logo'; // Remove the old Logo import
import { MENU_OPEN } from 'store/actions';

// Import your custom logo image
import myLogo from './Pharma5.png'; // Use './' to indicate the same directory

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      {/* Wrap the logo in a container with a fixed height */}
      <div style={{ height: '60px', overflow: 'visible', display: 'flex', alignItems: 'center' }}>
        <img src={myLogo} alt="My Logo" style={{ height: '80px', marginTop: '-10px', marginBottom: '-10px' }} /> {/* Adjust the style as needed */}
      </div>
    </ButtonBase>
  );
};

export default LogoSection; 