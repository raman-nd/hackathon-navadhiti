import { Box, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { LoginButton } from '../Components/Button/Button';
import { LoginInput } from '../Components/Input/Input';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { serviceOrderService } from './LoginState';

export const Login = () => {
  const [globalState, setGlobalState] = useOutletContext();
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const toggleShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleSignIn = async () => {
    if (state.username.length !== 0 || state.username !== '' || state.password.length !== 0 || state.password !== '') {
      const LoginObj = {
        userId: state.username,
        password: state.password,
      };
      await serviceOrderService
        .Login(LoginObj)
        .then((res) => {
          if (res.status !== 200) {
            setGlobalState({
              ...globalState,
              snackbar: {
                open: true,
                message: 'Something went wrong',
                severity: 'error',
              },
            });
          } else {
            localStorage.setItem('accessToken', `Bearer ${res.data.token}`);
            setGlobalState({
              ...globalState,
              loggedIn: true,
              snackbar: {
                open: true,
                message: 'Welcome back!',
                severity: 'success',
              },
            });
            navigate('/home/dashboard');
          }
        })
        .catch((err) => {
          setGlobalState({
            ...globalState,
            snackbar: {
              open: true,
              message: 'Something went wrong',
              severity: 'error',
            },
          });
        });
    } else {
      setGlobalState({
        ...globalState,
        snackbar: {
          open: true,
          message: 'Invalid username or password',
          severity: 'error',
        },
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: 350,
          width: 450,
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Typography variant="h4" sx={{ p: 2, color: 'var(--text-main)' }}>
          Login
        </Typography>
        <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <LoginInput label={'Username'} type={'text'} value={state.username} onChange={(e) => setState({ ...state, username: e.target.value })} />
          <LoginInput
            label={'Password'}
            type={state.showPassword ? 'text' : 'password'}
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            icon={state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            handleIconClick={toggleShowPassword}
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <LoginButton
            label={'Sign up'}
            onClick={() => {
              navigate('/signup');
            }}
          />
          <LoginButton label={'Sign in'} color={'success'} onClick={handleSignIn} />
        </Box>
      </Box>
    </Box>
  );
};
