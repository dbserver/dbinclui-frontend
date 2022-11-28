import { Theme, SxProps } from '@mui/material';

const widgetAccessibilityTools: SxProps<Theme> = {
  'position': 'fixed',
  'top': '35vh',
  'left': '-72px',
  'background': (theme) => theme.palette.secondary.main,
  'color': (theme) => theme.palette.text.secondary,
  'borderRadius': '0 0 15px 15px',
  'transform': 'rotate(-90deg)',
  'zIndex': '99999',
  'width': '180px',
  '&:hover': {
    background: (theme) => theme.palette.primary.light,
    color: ' #000',
  },
  '@media (max-width: 600px)': {
    top: '0',
    right: 'inherit',
    transform: 'rotate(0)',
    borderRadius: '0 0 15px 15px',
    left: 'calc(50% - 170.67px / 2)',
    fontSize: '14px',
  },
};

const widgetAccessibilityToolsonClick: SxProps<Theme> = {
  'position': 'fixed',
  'top': '35vh',
  'left': '-72px',
  'background': (theme) => theme.palette.primary.light,
  'color': (theme) => theme.palette.secondary.main,
  'borderRadius': '0 0 15px 15px',
  'transform': 'rotate(-90deg)',
  'zIndex': '99999',
  'width': '180px',
  '@media (max-width: 600px)': {
    top: '0',
    right: 'inherit',
    transform: 'rotate(0)',
    borderRadius: '0 0 15px 15px',
    left: 'calc(50% - 170.67px / 2)',
    fontSize: '14px',
  },
};

const modalAccessibilityTools: SxProps<Theme> = {
  width: '200px',
  height: '110px',
  background: (theme) => theme.palette.secondary.main,
  padding: '10px',
  borderRadius: '4px',
  boxShadow: '0px 0px 10px -4px rgba(0, 0, 0, 0.75)',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const styles = {
  widgetAccessibilityTools,
  modalAccessibilityTools,
  widgetAccessibilityToolsonClick,
};

export default styles;
