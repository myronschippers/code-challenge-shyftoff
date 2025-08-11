import { createTheme } from '@mui/material/styles';

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
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#2c2c2b',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // Remove background image from all Paper components
          // gets rid of Paper overlay default that MUI applies
          backgroundImage: 'none',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
  },
});
