import { TextField } from '@mui/material';
import { Controller, useFormContext, FieldError } from 'react-hook-form';
import { Schema } from 'zod';

type TextInputProps = {
  name: string;
  label: string;
  error?: FieldError;
  disabled: boolean;
  helperText?: string;
};

const TextInput = ({ name, label, error, disabled = false }: TextInputProps) => {
  const { control } = useFormContext<Schema>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={!!error}
          helperText={error ? error.message : ''}
          disabled={disabled}
          onBlur={field.onBlur}
        />
      )}
    />
  );
};

export default TextInput;
