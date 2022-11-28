import { Theme, SxProps } from '@mui/material';

const listTitle: SxProps<Theme> = {
  textAlign: 'center',
  fontWeight: 'bold',
};

const table: SxProps<Theme> = {
  'color': (theme) => theme.palette.text.primary,
  'width': '1000px',
  'mt': '25px',
  'ml': 'auto',
  'mr': 'auto',
  'pl': '15px',
  'pr': '15px',
  'border': '2px solid',
  'borderRadius': '20px',
  'borderColor': (theme) => theme.palette.text.primary,
  '& .MuiDataGrid-cell:focus': {
    outline: 'inherit',
  },
  '@media (max-width:780px)': {
    width: '90%',
    fontSize: '18px',
  },
};
const buttonTable: SxProps<Theme> = {
  'color': (theme) => theme.palette.text.primary,
  '&:hover': {
    border: '1px solid',
    borderColor: (theme) => theme.palette.primary.dark,
  },
};
const boxButton: SxProps<Theme> = {
  'display': 'flex',
  'justifyContent': 'center',
  'margin': '0 auto',
  'marginTop': '20px',
  '@media (max-width:780px)': {
    justifyContent: 'center',
    margin: '0 auto',
    marginTop: '40px',
  },
};

const button: SxProps<Theme> = {
  'fontWeight': '700',
  'padding': '0.5rem 1.5rem',
  'margin': '0 20px',
  'textTransform': 'none',
  'fontSize': '1.2rem',
  'border': '2px solid',
  'borderColor': (theme) => theme.palette.secondary.contrastText,
  'backgroundColor': (theme) => theme.palette.secondary.dark,
  'color': (theme) => theme.palette.text.disabled,
  '@media (max-width:780px)': {
    display: 'flex',
    justifyContent: 'center',
    margin: '5px',
    marginTop: '20px',
  },
};

const errorBox: SxProps<Theme> = {
  mt: '40px',
  width: '50%',
  ml: 'auto',
  mr: 'auto',
};

const styles = {
  listTitle,
  table,
  button,
  buttonTable,
  boxButton,
  errorBox,
};

export default styles;
