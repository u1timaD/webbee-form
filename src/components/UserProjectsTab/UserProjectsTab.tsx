import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { Schema } from '../../types/Schema';
import TextInput from '../../ui/TextInput/TextInput';
import {
  StyledButtonAddProject,
  StyledFormWrapper,
  StyledInputWrapper,
  StyledProjectBlock,
  StyledUserProjectContainer,
} from './UserProjectsTab.styled';
import AutocompleteInput from '../../ui/AutocomplateInput/AutocomplateInput';
import { dataSkills } from '../../utils/data';
import { useState } from 'react';
import ProjectBlock from '../ProjectBlock/ProjectBlock';

const UserProjectsTab = ({ readOnlyForm }) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    name: 'projects',
    control,
  });

  const [readOnlyProject, setReadOnlyProject] = useState(null);

  const handleClickTriggerForm = async (index) => {
    const result = await trigger(`projects.${index}`);

    if (result) {
      setReadOnlyProject(index);
    } else {
      setReadOnlyProject(null);
    }
  };

  const handleClickAddProjectForm = () => {
    append({
      projectName: '',
      skills: [],
    });
  };

  return (
    <StyledUserProjectContainer>
      <StyledFormWrapper>
        {fields.map((field, index) => (
          <StyledProjectBlock key={field.id}>
            <Typography variant="h6">Проект №{index + 1}</Typography>
            <StyledInputWrapper>
              <TextInput
                name={`projects.${index}.projectName`}
                label="Название"
                error={!!errors.projects?.[index]?.projectName}
                helperText={errors.projects?.[index]?.projectName?.message}
                disabled={readOnlyForm || readOnlyProject === index}
              />
              <AutocompleteInput<Schema>
                name={`projects.${index}.skills`}
                options={dataSkills}
                disabled={readOnlyForm || readOnlyProject === index}
              />
            </StyledInputWrapper>

            {readOnlyProject === index ? (
              <Box>
                <Button variant="contained" color="primary" onClick={() => setReadOnlyProject(null)}>
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
        ))}
      </StyledFormWrapper>

      <Box>
        <StyledButtonAddProject variant="contained" color="primary" onClick={handleClickAddProjectForm}>
          <AddOutlinedIcon />
        </StyledButtonAddProject>
      </Box>
    </StyledUserProjectContainer>
  );
};

export default UserProjectsTab;
