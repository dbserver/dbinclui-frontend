import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  helpModal: {
    '& .MuiPaper-root': {
      backgroundColor: '#FFFF',
      borderRadius: '8px',
    },
  },
  helpModalContrast: {
    '& .MuiPaper-root': {
      backgroundColor: '#FFFF00',
      borderRadius: '8px',
    },
  },
});
