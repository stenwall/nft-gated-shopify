import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f0e12',
      paper: '#0f0e12'
    },
    text: {
      primary: '#c3c0bb'
    },
    divider: '#4d4d4d'
  },
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    body1: {
      letterSpacing: '0.06rem'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'unset',
          boxShadow: '0',
          borderRadius: 0
        }
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          objectFit: 'contain',
          borderRadius: 0,
          width: '100%',
          height: '100%'
        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          display: 'block'
        }
      }
    }
  }
});

export default theme;
