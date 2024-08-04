import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

type SelectInputProps<T extends FieldValues> = {
  name: Path<T>;
  options: string[];
  disabled?: boolean;
};

const SelectInput = <T extends FieldValues>({ name, options, disabled }: SelectInputProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <Autocomplete
          value={value || null}
          onChange={(_, newValue) => {
            onChange(newValue || '');
          }}
          disabled={disabled}
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Роль на проекте" inputRef={ref} error={!!error} helperText={error?.message} />
          )}
        />
      )}
    />
  );
};

export default SelectInput;
