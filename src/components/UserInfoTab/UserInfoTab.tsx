import { Checkbox, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material';
import { StyledInputWrapper, StyledUserInfoWrapper } from './UserInfoTab.styled';
import { useFormContext } from 'react-hook-form';
import { Schema } from '../../types/Schema';
import TextInput from '../../ui/TextInput/TextInput';

const UserInfoTab = ({ readOnlyForm }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <StyledUserInfoWrapper>
      <Typography variant="h2">Общая информация</Typography>
      <StyledInputWrapper>
        <TextInput
          label="Фамилия"
          name="lastName"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          disabled={readOnlyForm}
        />
        <TextInput
          label="Имя"
          name="firstName"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          disabled={readOnlyForm}
        />
        <TextInput
          label="Отчество"
          name="patronymic"
          error={!!errors.patronymic}
          helperText={errors.patronymic?.message}
          disabled={readOnlyForm}
        />

        <TextField
          label="Телефон"
          {...register('phone')}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          disabled={readOnlyForm}
          type="number"
        />

        <TextField
          label="Email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={readOnlyForm}
        />

        <FormControl error={!!errors.agree}>
          <FormControlLabel
            control={<Checkbox {...register('agree')} />}
            label="За любой движ"
            disabled={readOnlyForm}
          />
          {errors.agree && <FormHelperText>{errors.agree.message}</FormHelperText>}
        </FormControl>
      </StyledInputWrapper>
    </StyledUserInfoWrapper>
  );
};
export default UserInfoTab;
