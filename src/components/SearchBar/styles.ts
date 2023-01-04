import { Theme, SxProps } from '@mui/material';

const input: SxProps<Theme> = {
    'mb': '30px',
    'p': '2px 4px',
    'display': 'flex',
    'alignItems': 'center',
    'width': 825,
    'minWidth': 250,
    'borderRadius': '15px',
    'border': 'solid 1px',
    'borderColor': (theme) => theme.palette.text.primary,
    'backgroundColor': (theme) => theme.palette.primary.contrastText,
    '@media (max-width:320px)': {
        borderRadius: '30px',
    },
};

const inputPlaceholder: SxProps<Theme> = {
    color: (theme) => theme.palette.text.primary,
    ml: 1,
    flex: 1,
};

const inputSearchIcon: SxProps<Theme> = {
    p: '10px',
    color: (theme) => theme.palette.text.primary,
};

const styles = {
    input,
    inputPlaceholder,
    inputSearchIcon,
};

export default styles;