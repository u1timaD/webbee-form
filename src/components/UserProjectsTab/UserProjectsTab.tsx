import { useFieldArray, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Schema } from '../../types/Schema';

import { StyledButtonAddProject, StyledFormWrapper, StyledUserProjectContainer } from './userProjectsTabStyled';
import UserProjectForm from '../UserProjectForm/UserProjectForm';

const UserProjectsTab = () => {
  const { control } = useFormContext<Schema>();
  const { fields, append, remove } = useFieldArray({
    name: 'projects',
    control,
  });

  const handleClickAddProjectForm = () => {
    append({
      projectName: '',
      skills: [],
      role: '',
      dateStartWork: new Date(),
      dateEndWork: undefined,
    });
  };

  return (
    <StyledUserProjectContainer>
      <StyledFormWrapper>
        {fields.length === 0 ? (
          <Typography variant="h5">Нет проектов</Typography>
        ) : (
          fields.map((field, index) => <UserProjectForm key={field.id} index={index} remove={remove} />)
        )}
        <Box>
          <StyledButtonAddProject variant="contained" color="primary" onClick={handleClickAddProjectForm}>
            <AddOutlinedIcon />
          </StyledButtonAddProject>
        </Box>
      </StyledFormWrapper>
    </StyledUserProjectContainer>
  );
};

export default UserProjectsTab;
