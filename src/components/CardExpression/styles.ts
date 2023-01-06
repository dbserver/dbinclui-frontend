import { SxProps, Theme } from '@mui/system';

const container: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '100%',
  height: '100%',
};

const list: SxProps<Theme> = {
  maxWidth: '100%',
  height: '30rem',
  overflowY: 'scroll',
  paddingLeft: '10rem',
  paddingRight: '10rem',
  marginTop: '10px',
};

const listItem: SxProps<Theme> = {
  'margin': '10px',
  'border': '1px solid black',
  'background': 'white',
  'borderRadius': '8px',
  'maxWidth': '780px',

  '@media (max-width:625px)': {
    display: 'flex',
    flexDirection: 'column',
    width: '15rem',
  },
  '@media (max-width:450px)': {
    display: 'flex',
    flexDirection: 'column',
    width: '10rem',
  },
};
const BoxIcon: SxProps<Theme> = {
  display: 'flex',
};
const listItemAccessibility: SxProps<Theme> = {
  'margin': '10px',
  'border': '1px solid yellow',
  'background': 'black',
  'borderRadius': '8px',
  'maxWidth': '780px',

  '@media (max-width:625px)': {
    display: 'flex',
    flexDirection: 'column',
    width: '15rem',
  },
  '@media (max-width:450px)': {
    display: 'flex',
    flexDirection: 'column',
    width: '10rem',
  },
};
const styles = {
  list,
  listItem,
  BoxIcon,
  container,
  listItemAccessibility,
};
export default styles;
