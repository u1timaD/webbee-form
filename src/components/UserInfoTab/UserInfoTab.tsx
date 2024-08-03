import { Checkbox, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material';
import { StyledInputWrapper, StyledUserInfoWrapper } from './UserInfoTab.styled';
import { useFormContext } from 'react-hook-form';
import { Schema } from '../../types/Schema';

const UserInfoTab = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <StyledUserInfoWrapper>
      <Typography variant="h2">Общая информация</Typography>
      <StyledInputWrapper>
        <TextField
          label="Фамилия"
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <TextField
          label="Имя"
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="Отчество"
          {...register('patronymic')}
          error={!!errors.patronymic}
          helperText={errors.patronymic?.message}
        />
        <TextField
          label="Телефон"
          {...register('phone')}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          type="number"
        />

        <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />

        <FormControl error={!!errors.agree}>
          <FormControlLabel control={<Checkbox {...register('agree')} />} label="За любой движ" />
          {errors.agree && <FormHelperText>{errors.agree.message}</FormHelperText>}
        </FormControl>
      </StyledInputWrapper>
    </StyledUserInfoWrapper>
  );
};
export default UserInfoTab;
