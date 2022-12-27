import React from 'react';

import { AccessibilityContextProvider } from './AccessibilityContext';
import { AuthContextProvider } from './AuthContext';

interface GlobalContextProps {
  children?: React.ReactNode;
}

export const GlobalContext: React.FC<GlobalContextProps> = ({ children }) => (
  <AuthContextProvider>
    <AccessibilityContextProvider>{children}</AccessibilityContextProvider>
  </AuthContextProvider>
);

export default GlobalContext;
