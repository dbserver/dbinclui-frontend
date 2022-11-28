import React, { createContext, useState } from 'react';

type AcessibilityType = {
  fontSizeScale: number;
};

interface AccessibilityContextProviderProps {
  children: React.ReactNode;
}

const DEFAULT_VALUE = {
  state: {
    fontSizeScale: 1,
  },
  dispatch: () => {},
  colorAccessibility: false,
  setColorAccessibility: () => {},
};

export interface AccessibilityContextInterface {
  state: AcessibilityType;
  dispatch: React.Dispatch<React.SetStateAction<AcessibilityType>>;
  colorAccessibility: boolean;
  setColorAccessibility: (value: boolean) => void;
}

export const AccessibilityContext =
  createContext<AccessibilityContextInterface>(DEFAULT_VALUE);

export const AccessibilityContextProvider: React.FC<
  AccessibilityContextProviderProps
> = ({ children }) => {
  const [state, dispatch] = useState<AcessibilityType>(DEFAULT_VALUE.state);

  const [colorAccessibility, setColorAccessibility] = useState(
    DEFAULT_VALUE.colorAccessibility,
  );

  return (
    <AccessibilityContext.Provider
      value={{
        state,
        dispatch,
        colorAccessibility,
        setColorAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityContext;
