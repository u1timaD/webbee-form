import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledButtonWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
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
  gap: ${({ theme }) => theme.spacing(3)};
`;
