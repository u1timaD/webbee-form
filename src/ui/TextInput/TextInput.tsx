import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Schema } from '../../types/Schema';

interface TextInputProps {
  name: string;
  label: string;
  error: boolean;
  type?: string;
  disabled: boolean;
  helperText?: string;
}

const TextInput = ({ name, label, error, helperText, disabled = false }: TextInputProps) => {
  const { register } = useFormContext<Schema>();
  return <TextField label={label} {...register(name)} error={error} helperText={helperText} disabled={disabled} />;
};

export default TextInput;
