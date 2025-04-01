import { SxProps, Theme } from '@mui/material';

export const appStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: '1440px',
  } as SxProps<Theme>,

  content: {
    flexGrow: 1,
  } as SxProps<Theme>,
};
