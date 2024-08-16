import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Schema } from '../../types/Schema';
import TextInput from '../../ui/TextInput/TextInput';
import { ReadOnlyFormContext } from '../../provider/MainFormProvider';
import { useContext } from 'react';
import { StyledInputWrapper, StyledUserInfoBlock, StyledUserInfoTitle, StyledUserInfoWrapper } from './userInfoTabStyled';

const UserInfoTab = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  const readOnlyForm = useContext(ReadOnlyFormContext);

  return (
    <StyledUserInfoWrapper>
      <StyledUserInfoBlock>
        <StyledUserInfoTitle variant="h6">Общая информация</StyledUserInfoTitle>
        <StyledInputWrapper>
          <TextInput
            label="Фамилия"
            name="lastName"
            error={errors.lastName}
            disabled={readOnlyForm}
          />
          <TextInput
            label="Имя"
            name="firstName"
            error={errors.firstName}
            disabled={readOnlyForm}
          />
          <TextInput
            label="Отчество"
            name="patronymic"
            error={errors.patronymic}
            disabled={readOnlyForm}
          />
        </StyledInputWrapper>
      </StyledUserInfoBlock>

      <StyledUserInfoBlock>
        <StyledUserInfoTitle variant="h6">Контактная информация</StyledUserInfoTitle>
        <StyledInputWrapper>
          <TextInput
            label="Телефон"
            name="phone"
            error={errors.phone}
            disabled={readOnlyForm}
          />
          <TextInput
            label="Email"
            name="email"
            error={errors.email}
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
      </StyledUserInfoBlock>
    </StyledUserInfoWrapper>
  );
};
export default UserInfoTab;
