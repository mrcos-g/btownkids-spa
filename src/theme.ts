'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#f4eede',
    },
    text: {
      primary: '#3c3d40',
    },
    primary: {
      main: '#c53e36',
    },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
});

export default theme;
