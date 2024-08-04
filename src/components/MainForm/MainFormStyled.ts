import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

export const StyledTabsWrapper = styled(Box)`
  width: 100%;
`;

export const StyledTabListWrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.dark};
`;

export const StyledSaveButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const StyledEditButton = styled(Button)``;
