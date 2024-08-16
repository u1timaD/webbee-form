import { Autocomplete, TextField } from '@mui/material';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { DataSkillsProps } from '../../utils/data';

type AutocompleteInputProps<T extends FieldValues> = {
  name: Path<T>;
  options: DataSkillsProps[];
  disabled?: boolean;
  label: string;
};

const AutocompleteInput = <T extends FieldValues>({ name, options, disabled, label }: AutocompleteInputProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref, onBlur }, fieldState: { error } }) => (
        <Autocomplete
          options={options}
          value={value?.map((id: string) => options?.find((item) => item.id === id))}
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item.id));
          }}
          getOptionLabel={(option) => options?.find((item) => item.id === option.id)?.label ?? ''}
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          disableCloseOnSelect
          multiple
          limitTags={2}
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

export default AutocompleteInput;
