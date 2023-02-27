import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { GenericButton, LogOutButton } from '../Components/Button/Button';

export const Home = () => {
  const [globalState, setGlobalState] = useOutletContext();
  const navigate = useNavigate();
  const [appBarState, setAppBarState] = useState({
    name: 'Dashboard',
  });

  const handleLogout = () => {
    setGlobalState({ ...globalState, loggedIn: false });
    localStorage.clear();
    navigate('/');
  };
  return (
    <Box>
      <AppBar
        sx={{
          background: 'var(--bg-main)',
          display: 'flex',
          flexDirection: 'column',
        }}
        position="sticky"
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ p: 1, cursor: 'pointer' }} onClick={() => navigate('/home/dashboard')}>
            {appBarState.name}
          </Typography>
          <LogOutButton onClick={handleLogout} />
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet context={[globalState, setGlobalState]} />
      </Box>
    </Box>
  );
};
