import { InputAdornment, TextField, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export const GenericInput = ({ label, onChange, type }) => {
  return <TextField fullWidth label={label} variant="outlined" onChange={onChange} type={type} />;
};

export const LoginInput = ({ label, value, onChange, type, icon, handleIconClick, multiline }) => {
  return (
    <TextField
      sx={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-main)' }}
      fullWidth
      value={value}
      label={label}
      onChange={onChange}
      type={type}
      multiline={multiline}
      rows={4}
      InputProps={{
        endAdornment: icon && (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleIconClick} onMouseDown={handleIconClick} edge="end">
              {icon}
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};

export const FormInput = ({ label, value, onChange, type, icon, handleIconClick, multiline }) => {
  return (
    <TextField
      sx={{
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-main)',
        minWidth: 250,
        width: 400,
      }}
      fullWidth
      value={value}
      label={label}
      onChange={onChange}
      type={type}
      multiline={multiline}
      size="small"
      rows={3.5}
      InputProps={{
        endAdornment: icon && (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleIconClick} onMouseDown={handleIconClick} edge="end">
              {icon}
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};

export const FormDatePicker = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        sx={{
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-main)',
          width: '100%',
        }}
        size="small"
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} size="small" />}
      />
    </LocalizationProvider>
  );
};

export const FormSelect = ({ label, value, onChange, items }) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        sx={{
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-main)',
          minWidth: 250,
          width: 400,
        }}
        labelId="simple-select-label"
        id="simple-select"
        value={value?.name || value}
        label={label}
        onChange={onChange}
        size="small"
      >
        {items?.map((each, index) => {
          return (
            <MenuItem key={index} value={each?.value}>
              {each?.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
