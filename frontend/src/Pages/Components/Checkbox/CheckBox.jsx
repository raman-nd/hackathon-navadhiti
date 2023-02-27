import { Checkbox, FormControlLabel } from '@mui/material';
import { Box } from '@mui/system';

export const CheckBoxWithLabel = ({ label, checked, onChange }) => {
  return (
    <Box>
      <FormControlLabel control={<Checkbox checked={checked} onChange={onChange} />} label={label} />
    </Box>
  );
};
