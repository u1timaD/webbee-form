import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Schema } from '../../types/Schema';

interface SpecializedInputProps extends Schema {
  name: string;
  label: string;
  error: boolean;
  type?: string;
  disabled: boolean;
  helperText: string;
}

const SpecializedInput = ({ name, label, error, helperText, type, disabled = false }: SpecializedInputProps) => {
  const { register } = useFormContext<Schema>();
  return (
    <TextField
      label={label}
      {...register(name)}
      error={error}
      helperText={helperText}
      disabled={disabled}
      type={type}
    />
  );
};

export default SpecializedInput;
