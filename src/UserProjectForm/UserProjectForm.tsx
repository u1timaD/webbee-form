import { Box, Button, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Schema } from '../types/Schema';
import { useFormStore, useProjectStore } from '../store/store';
import { StyledProjectBlock } from '../components/UserProjectsTab/userProjectsTabStyled';
import { StyledInputWrapper } from '../components/UserInfoTab/UserInfoTabStyled';
import TextInput from '../ui/TextInput/TextInput';
import AutocompleteInput from '../ui/AutocomplateInput/AutocomplateInput';
import { dataRoles, dataSkills } from '../utils/data';
import DatePickerInput from '../ui/DatePickerInput/DatePickerInput';
import SelectInput from '../ui/SelectInput/SelectInput';

interface UserProjectFormProps {
  index: number;
  remove: (index: number) => void;
}

const UserProjectForm = ({ index, remove }: UserProjectFormProps) => {
  const {
    trigger,
    formState: { errors },
  } = useFormContext<Schema>();

  const { projectFormList, addValidProjectForm, removeValidProjectForm } = useProjectStore();

  const { readOnlyForm } = useFormStore();

  const handleFindIndex = (index: number): boolean => {
    return projectFormList.includes(index);
  };

  const handleClickTriggerForm = async (index: number) => {
    const result = await trigger(`projects.${index}`);
    if (result) {
      addValidProjectForm(index);
    } else {
      removeValidProjectForm(index);
    }
  };

  return (
    <StyledProjectBlock>
      <Typography variant="h6">Проект №{index + 1}</Typography>
      <StyledInputWrapper>
        <TextInput
          name={`projects.${index}.projectName`}
          label="Название проекта"
          error={!!errors.projects?.[index]?.projectName}
          helperText={errors.projects?.[index]?.projectName?.message}
          disabled={handleFindIndex(index) || readOnlyForm}
        />
        <AutocompleteInput<Schema>
          name={`projects.${index}.skills`}
          options={dataSkills}
          disabled={handleFindIndex(index) || readOnlyForm}
        />
        <SelectInput<Schema>
          name={`projects.${index}.role`}
          options={dataRoles}
          disabled={handleFindIndex(index) || readOnlyForm}
        />
        <DatePickerInput<Schema>
          name={`projects.${index}.dateStartWork`}
          label="Начало работы"
          disabled={handleFindIndex(index) || readOnlyForm}
        />
        <DatePickerInput<Schema>
          name={`projects.${index}.dateEndWork`}
          label="Окончание работы"
          disabled={handleFindIndex(index) || readOnlyForm}
        />
      </StyledInputWrapper>

      {handleFindIndex(index) ? (
        <Box>
          <Button variant="contained" color="primary" onClick={() => removeValidProjectForm(index)}>
            Редактировать
          </Button>
        </Box>
      ) : (
        <Box>
          {!readOnlyForm && (
            <>
              <Button variant="contained" color="secondary" onClick={() => remove(index)}>
                Удалить
              </Button>
              <Button variant="contained" color="primary" onClick={() => handleClickTriggerForm(index)}>
                Добавить
              </Button>
            </>
          )}
        </Box>
      )}
    </StyledProjectBlock>
  );
};

export default UserProjectForm;
