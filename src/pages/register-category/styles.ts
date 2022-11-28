import { Theme, SxProps } from '@mui/material';

const content: SxProps<Theme> = {
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
  border: '2px solid',
  flexDirection: 'column',
  background: (theme) => theme.palette.background.paper,
  borderColor: (theme) => theme.palette.secondary.contrastText,
};

const header: SxProps<Theme> = {
  border: '2px solid',
  borderColor: (theme) => theme.palette.secondary.contrastText,
  background: (theme) => theme.palette.primary.main,
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
};

const headerTitle: SxProps<Theme> = {
  color: (theme) => theme.palette.text.primary,
  fontSize: '1.3rem',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: '2rem 0',
};

const labelInput: SxProps<Theme> = {
  color: (theme) => theme.palette.secondary.main,
  fontWeight: 'bold',
  mb: '0.5rem',
};

const input: SxProps<Theme> = {
  width: '100%',
  border: '1px solid',
  backgroundColor: (theme) => theme.palette.background.default,
  borderRadius: '15px',
  borderColor: 'secondary.primary',
  padding: '0.5rem 1rem',
  mb: '2.5rem',
};

const buttonWrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: '0.5rem',
};

const button: SxProps<Theme> = {
  fontWeight: '700',
  padding: '0.5rem 1.5rem',
  textTransform: 'none',
  fontSize: '1.2rem',
  backgroundColor: (theme) => theme.palette.secondary.dark,
  color: (theme) => theme.palette.text.disabled,
};

const select: SxProps<Theme> = {
  padding: 0,
};

const menuItem: SxProps<Theme> = {
  'color': (theme) => theme.palette.text.primary,
  'paddingTop': 0,
  '.MuiList-root': {
    background: (theme) => theme.palette.background.paper,
  },
};

const styles = {
  content,
  header,
  headerTitle,
  labelInput,
  input,
  buttonWrapper,
  button,
  select,
  menuItem,
};

export default styles;
