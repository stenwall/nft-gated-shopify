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
    fontFamily: ['Helvetica', 'sans-serif'].join(','),
    h3: {
      letterSpacing: '0.06rem',
      fontWeight: 'inherit',
      textTransform: 'none',
      marginBottom: '0'
    },
    body1: {
      letterSpacing: '0.06rem',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      textTransform: 'none'
    }
  },
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          outline: 'none',
          color: '#c3c0bb'
        }
      }
    },
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
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          position: 'absolute',
          right: 0,
          top: 0,
          background: '#0f0e12',
          borderRadius: 0,
          '&:hover': {
            background: '#0f0e12',
            borderRadius: '50%',
          }
        }
      }
    }
  }
});

export default theme;
