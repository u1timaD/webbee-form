import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const StyledUserInfoWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledUserInfoBlock = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const StyledUserInfoTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const StyledInputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
