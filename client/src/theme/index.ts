import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#BAFF66',
    },
    secondary: {
      main: '#FF9B23',
    },
    background: {
      default: '#1b1b1b',
      paper: '#2c2c2b',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
  },
});
