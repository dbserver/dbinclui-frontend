import { createTheme } from '@mui/material/styles';
import { ColorsDefault } from './colors';
import { AccessibilityColors } from './colorsAccessibility';
import { ptBR } from '@material-ui/core/locale';

const getTitleStyle = (size: string) => ({
  fontSize: size,
  fontFamily: 'verdana, roboto, sans-serif',
  fontStyle: 'bold',
});

// A custom theme for this app
const theme = (themeMode: string) => {
  const Colors = themeMode === 'contrast' ? AccessibilityColors : ColorsDefault;
  return createTheme(
    {
      palette: {
        background: {
          default: Colors.PRIMARY,
          paper: Colors.CONTENT,
        },
        text: {
          primary: Colors.SECONDARY,
          secondary: Colors.PRIMARY,
          disabled: Colors.LIGHT,
        },
        primary: {
          light: Colors.PRIMARY_LIGHT,
          dark: Colors.INPUT_TEXT,
          main: Colors.PRIMARY,
          contrastText: Colors.BUTTON_CONTRAST,
        },
        secondary: {
          light: Colors.SECONDARY_CONTRAST,
          dark: Colors.SECONDARY_CONTENT,
          main: Colors.SECONDARY,
        },
        error: {
          contrastText: Colors.CONTENT_BORDER,
          main: Colors.DANGER,
        },
      },
      typography: {
        fontFamily: 'verdana, roboto, sans-serif',
        h1: getTitleStyle('72px'),
        h2: getTitleStyle('32px'),
        h3: getTitleStyle('24px'),
        h4: getTitleStyle('18px'),
        h5: getTitleStyle('16px'),
        h6: getTitleStyle('14px'),
        body1: {
          fontSize: '16px',
        },
        body2: {
          fontSize: '14px',
          lineHeight: '28px',
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            text: {
              color: Colors.BUTTON_CONTRAST,
            },
            outlined: {
              '&:hover': {
                backgroundColor: Colors.SECONDARY,
                color: '#000',
              },
              'backgroundColor': Colors.SECONDARY,
            },
          },
        },
      },
      spacing: 8,
    },
    ptBR,
  );
};

export default theme;
