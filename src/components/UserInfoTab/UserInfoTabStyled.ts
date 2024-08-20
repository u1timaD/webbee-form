import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const StyledUserInfoWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const StyledUserInfoBlock = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const StyledUserInfoTitle = styled(Typography)``;

export const StyledInputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;
