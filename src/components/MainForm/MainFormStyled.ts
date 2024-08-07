import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledTabsWrapper = styled(Box)`
  width: 100%;
`;

export const StyledTabListWrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.dark};
`;

export const StyledButtonWrapper = styled(Box)`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(3)};
`;
