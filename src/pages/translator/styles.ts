import { Theme, SxProps } from '@mui/material';

const translateTitle: SxProps<Theme> = {
  color: (theme) => theme.palette.text.primary,
  fontSize: '2rem',
  fontWeight: 'bold',
};
const micButton: SxProps<Theme> = {
  'backgroundColor': (theme) => theme.palette.secondary.contrastText,
  'borderRadius': '13px',
  '&:hover': {
    backgroundColor: (theme) => theme.palette.secondary.contrastText,
  },
  '&:active': {
    backgroundColor: (theme) => theme.palette.error.main,
  },
  '@media (max-width:425px)': {
    ml: '100%',
  },
};

const input: SxProps<Theme> = {
  'mb': '30px',
  'p': '2px 10px',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  'width': '100%',
  'minWidth': 250,
  'borderRadius': '15px',
  'border': 'solid 1px',
  'borderColor': (theme) => theme.palette.text.primary,
  'backgroundColor': (theme) => theme.palette.primary.contrastText,
  '@media (max-width:320px)': {
    borderRadius: '30px',
  },
};
const inputExpression: SxProps<Theme> = {
  'mb': '30px',
  'p': '2px 10px',
  'display': 'flex',
  'alignItems': 'center',
  'width': '80%',
  'minWidth': 250,
  'borderRadius': '15px',
  'border': 'solid 1px',
  'borderColor': (theme) => theme.palette.text.primary,
  'backgroundColor': (theme) => theme.palette.primary.contrastText,
  '@media (max-width:425px)': {
    borderRadius: '30px',
    mb: '10px',
  },
};
const inputLabel: SxProps<Theme> = {
  color: (theme) => theme.palette.text.primary,
  ml: 1,
  flex: 1,
};

const BoxFormControl: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
};

const FormControl: SxProps<Theme> = {
  'display': 'flex',
  'flexDirection': 'row',
  'justifyContent': 'space-between',
  'width': '54vw',
  'alignItems': 'start',
  '@media (max-width:425px)': {
    flexDirection: 'column',
  },
};

const button: SxProps<Theme> = {
  'fontWeight': '700',
  'padding': '0.3rem 1.5rem',
  'margin': '0 20px',
  'textTransform': 'none',
  'fontSize': '1.2rem',
  'backgroundColor': (theme) => theme.palette.secondary.contrastText,
  'color': (theme) => theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: (theme) => theme.palette.secondary.light,
    color: (theme) => theme.palette.text.secondary,
  },
  '@media (max-width:780px)': {
    display: 'flex',
    justifyContent: 'center',
    margin: '5px',
    marginTop: '20px',
  },
};

const BoxBottons: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  maxWidth: '50%',
};

const saveButton: SxProps<Theme> = {
  p: '10px',
  width: '2.5rem',
  color: (theme) => theme.palette.text.primary,
};

const styles = {
  translateTitle,
  FormControl,
  input,
  micButton,
  button,
  BoxFormControl,
  inputLabel,
  BoxBottons,
  saveButton,
  inputExpression,
};

export default styles;
