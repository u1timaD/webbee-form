import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

export const StyledUserProjectContainer = styled(Box)`
  display: flex;
`;

export const StyledFormWrapper = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(5)};
`;

export const StyledProjectBlock = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid green;
`;

export const StyledInputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const StyledButtonAddProjectWrapper = styled(Box)`
  margin-left: ${({ theme }) => theme.spacing(5)};
`;
export const StyledButtonAddProject = styled(Button)`
  width: 200px;
  height: 200px;
`;
