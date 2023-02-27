import { Alert, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const LoggedIn = localStorage.getItem('accessToken');

export const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [globalState, setGlobalState] = useState({
    loggedIn: true,

    snackbar: {
      open: false,
      message: '',
      severity: 'success',
    },
  });

  const handleClose = () => {
    setGlobalState({
      ...globalState,
      snackbar: {
        ...globalState.snackbar,
        open: false,
      },
    });
  };

  useEffect(() => {
    if (location.pathname === '/signup') {
    } else if ((!globalState.loggedIn && location.pathname !== '/') || !localStorage.getItem('accessToken')) {
      navigate('/');
      console.log('no access token', localStorage.getItem('accessToken'), globalState.loggedIn);
    }
  }, [location.pathname, localStorage.getItem('accessToken')]);

  return (
    <Box>
      <Outlet context={[globalState, setGlobalState]} />
      <Snackbar open={globalState.snackbar.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={globalState.snackbar.severity} sx={{ width: '100%' }}>
          {globalState.snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
