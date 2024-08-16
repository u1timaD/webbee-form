import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

export const StyledUserProjectContainer = styled(Box)`
  display: flex;
`;

export const StyledFormWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 500px);
  grid-auto-rows: minmax(560px, auto);
  gap: ${({ theme }) => theme.spacing(5)};
`;

export const StyledProjectBlock = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)};
`;

export const StyledInputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const StyledButtonAddProject = styled(Button)`
  width: 100%;
  height: 100%;
`;
