import { Button, Typography } from '@mui/material';

export const GenericButton = ({ label, onClick, color }) => {
  return (
    <Button variant="contained" onClick={onClick} fullWidth color={color}>
      {label}
    </Button>
  );
};

export const LogOutButton = ({ onClick }) => {
  return (
    <Button sx={{ color: 'white' }} onClick={onClick}>
      Logout
    </Button>
  );
};

export const IconWithLabelButton = ({ label, icon, onClick }) => {
  return (
    <Button
      sx={{
        backgroundColor: 'var(--bg-main)',
        color: 'white',
        display: 'flex',
        gap: 1,
        ':hover': { color: 'var(--text-main)' },
      }}
      onClick={onClick}
    >
      {icon}
      <Typography sx={{ textTransform: 'none', display: { sm: 'flex', sd: 'none' } }}>{label}</Typography>
    </Button>
  );
};

export const LoginButton = ({ label, onClick, color }) => {
  return (
    <Button variant="contained" onClick={onClick} fullWidth color={color} sx={{ borderRadius: 0 }} size="large">
      {label}
    </Button>
  );
};

export const FormButton = ({ label, onClick, color }) => {
  return (
    <Button variant="contained" onClick={onClick} fullWidth color={color} sx={{ borderRadius: 0, width: 300 }} size="medium">
      {label}
    </Button>
  );
};
