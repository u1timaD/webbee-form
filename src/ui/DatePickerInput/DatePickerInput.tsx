import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

type DatePickerInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  disabled?: boolean;
};

const DatePickerInput = <T extends FieldValues>({ name, label, disabled }: DatePickerInputProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={value || null}
            onChange={onChange}
            slotProps={{
              textField: {
                label: label,
                inputRef: ref,
                error: !!error,
                helperText: error?.message,
                fullWidth: true,
                disabled: disabled,
                format: 'dd/MM/yyyy',
              },
            }}
            disabled={disabled}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default DatePickerInput;
