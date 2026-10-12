import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0b3d91',
      light: '#2a6de1',
      dark: '#072c66'
    },
    secondary: {
      main: '#15b2a6'
    },
    background: {
      default: '#f5f7fb',
      paper: '#ffffff'
    },
    text: {
      primary: '#112240',
      secondary: '#5f6f8c'
    },
    success: {
      main: '#2e9e64'
    },
    warning: {
      main: '#d98c0f'
    },
    error: {
      main: '#d93a3a'
    }
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 30px rgba(17,34,64,0.08)',
          border: '1px solid rgba(17,34,64,0.04)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 18px'
        }
      }
    }
  }
});
