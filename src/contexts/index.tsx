import React from 'react';

import { AccessibilityContextProvider } from './AccessibilityContext';

interface GlobalContextProps {
  children?: React.ReactNode;
}

export const GlobalContext: React.FC<GlobalContextProps> = ({ children }) => (
  <AccessibilityContextProvider>{children}</AccessibilityContextProvider>
);

export default GlobalContext;
