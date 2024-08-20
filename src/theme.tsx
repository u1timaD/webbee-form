import { createTheme, Theme as MuiTheme } from '@mui/material/styles';
import '@emotion/react';

declare module '@emotion/react' {
  interface Theme extends MuiTheme {
    spacing: (firstFactor: number, secondFactor?: number) => string;
  }
}

const theme = createTheme({
  spacing: (factor: number) => `${factor * 8}px`,
});

export default theme;
