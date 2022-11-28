import { Theme, SxProps } from '@mui/material';

const content: SxProps<Theme> = {
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
  border: '2px solid',
  flexDirection: 'column',
  borderColor: (theme) => theme.palette.secondary.contrastText,
  background: (theme) => theme.palette.background.paper,
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

const buttonFechar: SxProps<Theme> = {
  color: (theme) => theme.palette.text.primary,
};

const fileName: SxProps<Theme> = {
  mr: 0,
  ml: 'auto',
  display: 'block',
  textAlign: 'right',
};

const containerUpload: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  '.MuiContainer-root': {
    padding: 0,
  }
}

const uploadIcon: SxProps<Theme> = {
  fontSize: '2rem',
  textAlign: "center",
  margin: 0,
  padding: 0,
};

const clearButton: SxProps<Theme> = {
  color: '#FF0000'
}

const buttonFileUpload: SxProps<Theme> = {
  mr: 0,
  ml: 'auto',
  mb: '0.8rem',
  display: 'block',
  padding: '0.3rem 1rem',
  fontWeight: '700',
  textTransform: 'none',
  width: '13.1rem',
  backgroundColor: (theme) => theme.palette.secondary.dark,
  color: (theme) => theme.palette.text.disabled,
};


const styles = {
  content,
  header,
  headerTitle,
  labelInput,
  input,
  buttonWrapper,
  button,
  buttonFechar,
  containerUpload,
  fileName,
  uploadIcon,
  clearButton,
  buttonFileUpload,
};

export default styles;
