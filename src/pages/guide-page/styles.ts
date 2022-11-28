import { Theme, SxProps } from '@mui/material';

const indexWrapper: SxProps<Theme> = {
  overflow: 'auto',
  height: '25rem',
  mt: '2rem',
  scrollbarWidth: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  padding: '2rem',
  minHeight: '4rem',
  width: 'inherit',
  maxWidth: 'inherit',
  display: { xs: 'none', md: 'block' },
};

const buttonWrapper: SxProps<Theme> = {
  alignItems: 'center',
  justifyContent: 'center',
  height: 'fit-content',
  padding: '0.1rem 0',
};

const index: SxProps<Theme> = {
  cursor: 'pointer',
  color: (theme) => theme.palette.text.primary,
  ml: '2rem',
  display: { xs: 'none', md: 'flex' },
};

const indexFirst: SxProps<Theme> = {
  position: 'fixed',
  color: (theme) => theme.palette.text.primary,
  ml: '4rem',
  fontWeight: 'bold',
  mb: '2rem',
  display: { xs: 'none', md: 'flex' },
};

const header: SxProps<Theme> = {
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'center',
};

const guideContent: SxProps<Theme> = {
  fontSize: '1.14rem',
  mb: '3rem',
  whiteSpace: 'pre-wrap',
};

const digitalContent: SxProps<Theme> = {
  fontSize: '1.14rem',
  mb: '1rem',
};

const errorMessage: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexGrow: '1',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: '3rem',
};

const styles = {
  indexWrapper,
  index,
  header,
  guideContent,
  digitalContent,
  buttonWrapper,
  indexFirst,
  errorMessage,
};

export default styles;
