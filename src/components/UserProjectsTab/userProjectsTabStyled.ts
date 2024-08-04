import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

export const StyledUserProjectContainer = styled(Box)`
 display: flex;
`;

export const StyledFormWrapper = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export const StyledProjectBlock = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  border: 1px solid green;
`;

export const StyledInputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledButtonAddProject = styled(Button)`
  width: 200px;
  height: 200px;
`;
