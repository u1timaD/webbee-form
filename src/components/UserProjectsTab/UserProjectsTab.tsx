import { useFieldArray, useFormContext } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { Schema } from '../../types/Schema';
import TextInput from '../../ui/TextInput/TextInput';
import {
  StyledButtonAddProject,
  StyledButtonAddProjectWrapper,
  StyledFormWrapper,
  StyledInputWrapper,
  StyledProjectBlock,
  StyledUserProjectContainer,
} from './userProjectsTabStyled';
import AutocompleteInput from '../../ui/AutocomplateInput/AutocomplateInput';
import { dataRoles, dataSkills } from '../../utils/data';
import { useFormStore, useProjectStore } from '../../store/store';
import SelectInput from '../../ui/SelectInput/SelectInput';
import DatePickerInput from '../../ui/DatePickerInput/DatePickerInput';
import { format } from 'date-fns';

const UserProjectsTab = () => {
  const { readOnlyForm } = useFormStore();

  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    name: 'projects',
    control,
  });

  const { projectFormList, addValidProjectForm, removeValidProjectForm } = useProjectStore();

  const handleClickTriggerForm = async (index: number) => {
    const result = await trigger(`projects.${index}`);

    if (result) {
      addValidProjectForm(index);
    } else {
      removeValidProjectForm(index);
    }
  };

  const handleClickAddProjectForm = () => {
    append({
      projectName: '',
      skills: [],
      role: '',
      dateStartWork: new Date(),
      dateEndWork: undefined,
    });
  };

  const handleFindIndex = (index: number): boolean => {
    return projectFormList.includes(index);
  };

  return (
    <StyledUserProjectContainer>
      <StyledFormWrapper>
        {fields.length === 0 ? (
          <>
            <Typography variant="h5">Нет проектов</Typography>
          </>
        ) : (
          fields.map((field, index) => (
            <StyledProjectBlock key={field.id}>
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

              {handleFindIndex(index) && !readOnlyForm ? (
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
          ))
        )}
      </StyledFormWrapper>

      <StyledButtonAddProjectWrapper>
        <StyledButtonAddProject variant="contained" color="primary" onClick={handleClickAddProjectForm}>
          <AddOutlinedIcon />
        </StyledButtonAddProject>
      </StyledButtonAddProjectWrapper>
    </StyledUserProjectContainer>
  );
};

export default UserProjectsTab;
