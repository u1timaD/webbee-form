import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { DataRolesProps } from '../../utils/data';

type SelectInputProps<T extends FieldValues> = {
  name: Path<T>;
  options: DataRolesProps;
  disabled?: boolean;
  label: string;
};

const SelectInput = <T extends FieldValues>({ name, options, disabled, label }: SelectInputProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref, onBlur }, fieldState: { error } }) => (
        <Autocomplete
          options={options}
          value={value || null}
          onChange={(_, newValue) => {
            onChange(newValue || '');
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              onBlur={onBlur}
            />
          )}
        />
      )}
    />
  );
};

export default SelectInput;
