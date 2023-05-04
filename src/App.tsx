import React, { useState } from 'react';
import Routers from '@routes/routes';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme';
import AccessibilityTools from '@components/AcessibilityTools';
import GlobalContext from './contexts';

function App() {
  const [themeMode, setThemeMode] = useState('default');
  const toggleTheme = () => (themeMode === 'default' ? 'contrast' : 'default');
  return (
    <ThemeProvider theme={theme(themeMode)}>
      <GlobalContext>
        <CssBaseline />
        <AccessibilityTools
          handleClickContrastButton={() => {
            setThemeMode(toggleTheme());
          }}
        />
        <React.StrictMode>
          <Routers />
        </React.StrictMode>
      </GlobalContext>
    </ThemeProvider>
  );
}

export default App;
