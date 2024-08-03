import { useFormContext } from 'react-hook-form';
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
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <StyledUserProjectContainer>
      <StyledFormWrapper>
        <StyledProjectBlock>
          <Typography variant="h6">Проект №{1}</Typography>
          <StyledInputWrapper>
            <TextInput
              name="projectName"
              label="Название"
              error={!!errors.projectName}
              helperText={errors.projectName?.message}
              disabled={readOnlyForm}
            />
          </StyledInputWrapper>
          <Box>
            {!readOnlyForm && (
              <Button variant="contained" color="secondary">
                Удалить
              </Button>
            )}
            <Button variant="contained" color="primary">
              Добавить
            </Button>
          </Box>
        </StyledProjectBlock>
      </StyledFormWrapper>
      <Box>
        {!readOnlyForm && (
          <StyledButtonAddProject variant="contained" color="primary">
            <AddOutlinedIcon />
          </StyledButtonAddProject>
        )}
      </Box>
    </StyledUserProjectContainer>
  );
};

export default UserProjectsTab;
