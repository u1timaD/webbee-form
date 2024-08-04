import { Autocomplete, TextField } from '@mui/material';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { DataSkillsProps } from '../../utils/data';

type AutocompleteInputProps<T extends FieldValues> = {
  name: Path<T>;
  options: DataSkillsProps[];
  disabled?: boolean;
};

const AutocompleteInput = <T extends FieldValues>({ name, options, disabled }: AutocompleteInputProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options || []}
          value={value?.map((id: string) => options?.find((item) => item.id === id))}
          getOptionLabel={(option) => options?.find((item) => item.id === option.id)?.label ?? ''}
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item.id));
          }}
          disableCloseOnSelect
          multiple
          limitTags={2}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ width: '250px' }}
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              label={'Навыки'}
            />
          )}
        />
      )}
    />
  );
};

export default AutocompleteInput;
