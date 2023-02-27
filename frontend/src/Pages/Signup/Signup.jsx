import { Box, Collapse, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { LoginInput } from '../Components/Input/Input';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { CheckBoxWithLabel } from '../Components/Checkbox/CheckBox';
import { LoginButton } from '../Components/Button/Button';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Joi from 'joi';
import { serviceOrderService } from './SignupState';

// const LoginScheme = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
//   confirmPassword: Joi.ref("password").required(),
//   phone: Joi.number().length(10).required(),
// });

export const SignUp = () => {
  const [globalState, setGlobalState] = useOutletContext();

  const navigate = useNavigate();
  const [state, setState] = useState({
    showPassword: false,
    showConfirmPassword: false,

    userId: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const toggleShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const toggleShowConfirmPassword = () => {
    setState({ ...state, showConfirmPassword: !state.showConfirmPassword });
  };
  const handleSubmit = async () => {
    if (state.userId.length === 0 || state.userId === '' || state.password.length === 0 || state.password === '') {
      setGlobalState({
        ...globalState,
        snackbar: {
          open: true,
          message: 'Fields cannot be empty',
          severity: 'error',
        },
      });
    } else {
      let SignupObj = {
        userId: state.userId,
        password: state.password,
        fullName: state.fullName,
      };
      await serviceOrderService
        .Signup(SignupObj)
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
            setGlobalState({
              ...globalState,
              snackbar: {
                open: true,
                message: 'Sign up successful',
                severity: 'success',
              },
            });
            navigate('/');
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
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: { sm: 'center' },
        p: { sm: 2 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 2,
          overflow: 'hidden',
          p: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: 'var(--text-main)' }}>
          Sign up
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ minWidth: 350, width: 500 }}>
            <Typography variant="h6" sx={{ px: 2, pb: 1, color: 'var(--text-main)' }}>
              Login information
            </Typography>
            <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <LoginInput label={'UserId'} type={'email'} value={state.userId} onChange={(e) => setState({ ...state, userId: e.target.value })} />
              <LoginInput label={'Full Name'} type={'fullName'} value={state.fullName} onChange={(e) => setState({ ...state, fullName: e.target.value })} />
              <LoginInput
                label={'Password'}
                type={state.showPassword ? 'text' : 'password'}
                value={state.password}
                onChange={(e) => setState({ ...state, password: e.target.value })}
                icon={state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                handleIconClick={toggleShowPassword}
              />
              <LoginInput
                label={'Confirm Password'}
                type={state.showConfirmPassword ? 'text' : 'password'}
                value={state.confirmPassword}
                onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}
                icon={state.showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                handleIconClick={toggleShowConfirmPassword}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
          }}
        >
          <Box>
            Already a member?{' '}
            <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              Sign in
            </Link>
          </Box>
          <Box>
            <LoginButton label="Sign Up" onClick={handleSubmit} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
