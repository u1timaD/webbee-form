import { Box, Button, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Schema } from '../../types/Schema';
import { useCallback, useContext } from 'react';
import { StyledProjectBlock, StyledButtonWrapper, StyledInputWrapper } from './userProjectFormStyled';
import TextInput from '../../ui/TextInput/TextInput';
import { dataRoles, dataSkills } from '../../utils/data';
import DatePickerInput from '../../ui/DatePickerInput/DatePickerInput';
import SelectInput from '../../ui/SelectInput/SelectInput';
import { ReadOnlyFormContext } from '../../provider/MainFormProvider';
import AutocompleteInput from '../../ui/AutocompleteInput/AutocompleteInput';
import { SetValidProjectsContext, ValidProjectsContext } from '../../provider/ProjectFormProvider';

interface UserProjectFormProps {
  index: number;
  remove: (index: number) => void;
}

const UserProjectForm = ({ index, remove }: UserProjectFormProps) => {
  const readOnlyForm = useContext(ReadOnlyFormContext);
  const validProjects = useContext(ValidProjectsContext);
  const setValidProjects = useContext(SetValidProjectsContext);

  const {
    trigger,
    formState: { errors },
  } = useFormContext<Schema>();

  const readOnlyProject = validProjects.includes(index);

  const handleClickTriggerForm = useCallback(
    async (index: number) => {
      const result = await trigger(`projects.${index}`);
      if (result) {
        setValidProjects((prev) => [...prev, index]);
      } else {
        setValidProjects((prev) => prev.filter((i) => i !== index));
      }
    },
    [trigger, setValidProjects],
  );

  return (
    <StyledProjectBlock>
      <Typography variant="h6">Проект №{index + 1}</Typography>
      <StyledInputWrapper>
        <TextInput
          name={`projects.${index}.projectName`}
          label="Название проекта"
          error={errors.projects?.[index]?.projectName}
          disabled={readOnlyProject || readOnlyForm}
        />
        <AutocompleteInput<Schema>
          name={`projects.${index}.skills`}
          label="Навыки"
          options={dataSkills}
          disabled={readOnlyProject || readOnlyForm}
        />
        <SelectInput<Schema>
          name={`projects.${index}.role`}
          label="Роль на проекте"
          options={dataRoles}
          disabled={readOnlyProject || readOnlyForm}
        />
        <DatePickerInput<Schema>
          name={`projects.${index}.dateStartWork`}
          label="Начало работы"
          disabled={readOnlyProject || readOnlyForm}
        />
        <DatePickerInput<Schema>
          name={`projects.${index}.dateEndWork`}
          label="Окончание работы"
          disabled={readOnlyProject || readOnlyForm}
        />
      </StyledInputWrapper>
      <Box>
        {readOnlyProject && !readOnlyForm ? (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setValidProjects((prev) => prev.filter((i) => i !== index))}
            >
              Редактировать
            </Button>
          </Box>
        ) : (
          <>
            {!readOnlyForm && (
              <StyledButtonWrapper>
                <Button variant="contained" color="secondary" onClick={() => remove(index)}>
                  Удалить
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleClickTriggerForm(index)}>
                  Добавить
                </Button>
              </StyledButtonWrapper>
            )}
          </>
        )}
      </Box>
    </StyledProjectBlock>
  );
};

export default UserProjectForm;
