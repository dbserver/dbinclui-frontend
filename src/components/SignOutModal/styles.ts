import { makeStyles } from '@mui/styles';
import { Theme, SxProps } from '@mui/material';

export const useStyles = makeStyles({
  logInModal: {
    '& .MuiPaper-root': {
      backgroundColor: '#FFFF',
      borderRadius: '8px',
    },
  },
  logInModalContrast: {
    '& .MuiPaper-root': {
      backgroundColor: '#FFFF00',
      borderRadius: '8px',
    },
  },
});

const boxStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  p: '24px 46px',
  gap: '18px',
  wordBreak: 'break-word',
};

const button: SxProps<Theme> = {
  'p': '10px 12px',
  'width': '200px',
  'borderRadius': '10px',
  'transition': 'all 0.3s',
  'display': 'flex',
  'gap': '14px',
  ':hover': {
    backgroundColor: '#EFF0F6',
  },
};

export const styles = {
  boxStyles,
  button,
};
