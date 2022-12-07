import { Theme, SxProps } from '@mui/material';

const listTitle: SxProps<Theme> = {
  textAlign: 'center',
  fontWeight: 'bold',
};

const table: SxProps<Theme> = {
  'color': (theme) => theme.palette.text.primary,
  'borderColor': (theme) => theme.palette.text.primary,
  'borderRadius': '1.5rem',
  'border': '2px solid',
  'width': '1233px',
  'mt': '25px',
  'ml': 'auto',
  'mr': 'auto',
  'pl': '15px',
  'pr': '15px',



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

const buttonBox: SxProps<Theme> = {
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
  'backgroundColor': (theme) => theme.palette.secondary.dark,
  'color': (theme) => theme.palette.text.disabled,
  '@media (max-width:780px)': {
    display: 'flex',
    justifyContent: 'center',
    margin: '5px',
    marginTop: '20px',
  },
};
const FormControl:SxProps<Theme> = {
  'display': 'flex',
  'width': '30rem',

  '@media (max-width:650px)':{
    display: 'flex',
    maxWidth: '20rem'
  },
  '@media (max-width:500px)':{
    display: 'flex',
    maxWidth: '10rem'
  }
}
const TextField:SxProps<Theme> ={
  'border':'1px solid black',
  'borderRadius': '50px ',
  'padding': '0 10px 0 10px'
}
const styles = {
  listTitle,
  table,
  buttonBox,
  button,
  buttonTable,
  FormControl,
  TextField
};

export default styles;
