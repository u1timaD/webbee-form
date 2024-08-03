import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Schema } from '../../types/Schema';

const TextInput = ({ name, label, error, helperText, disabled = false }) => {
  const {
    register,
  } = useFormContext<Schema>();
  return (
    <TextField
      label={label}
      {...register(name)}
      error={error}
      helperText={helperText}
      disabled={disabled}
    />
  );
};

export default TextInput;
