import { useFieldArray, useFormContext } from 'react-hook-form';
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

const UserProjectsTab = ({ readOnlyForm }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Schema>();

  const { fields, append, remove } = useFieldArray({
    name: 'projects',
    control,
  });

  const handleClickAddProjectForm = () => {
    append({
      projectName: '',
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
                disabled={readOnlyForm}
              />
            </StyledInputWrapper>

            <Box>
              {!readOnlyForm && (
                <Button variant="contained" color="secondary" onClick={() => remove(index)}>
                  Удалить
                </Button>
              )}
              <Button variant="contained" color="primary">
                Добавить
              </Button>
            </Box>
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
